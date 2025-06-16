import {PublishPropsType} from "@/features/mote/packets/PublishPacket";
import Packet from "@/features/mote/packets/Packet";
import MoteControllerType from "@/features/mote/types/MoteControllerType";
import {SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import ConnectionState from "@/features/mote/types/ConnectionState";
import noop from "@/utils/noop";
import {
  ConnectAcknowledgementPropsType,
  ConnectAcknowledgementReturnCodeType
} from "@/features/mote/packets/ConnectAcknowledgementPacket";
import {PacketWithIdDataType} from "@/features/mote/packets/PacketWithId";
import PublisherType from "@/features/mote/types/PublisherType";
import {SubscribePropsType, TopicWithOptionsType} from "@/features/mote/packets/SubscribePacket";
import {UnsubscribePropsType} from "@/features/mote/packets/UnsubscribePacket";
import QosType from "@/features/mote/QosType";
import CallbackType from "@/features/mote/types/CallbackType";
import NodeType from "@/features/mote/types/NodeType";

const HOST = process.env.EXPO_PUBLIC_MOTE_HOST || window.location.hostname;
const PROTOCOL = process.env.EXPO_PUBLIC_MOTE_PROTOCOL || (window.location.protocol === "https:" ? "wss" : "ws");
const PORT = process.env.EXPO_PUBLIC_MOTE_PORT || null;
const PATH = process.env.REACT_APP_MOTE_PATH || "/mote/";
const URL = `${PROTOCOL}://${HOST}:${PORT? `:${PORT}`: ""}${PATH}`;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL_MS = 500;
const pingRequest = Packet.toBytes("pingreq", {});
const encoder = new TextEncoder();
const decoder = new TextDecoder();


interface InflightMessageType extends PublishPropsType {
  timeout: number;
}

interface InflightSubscribeType extends SubscribePropsType {
  timeout: number;
}

interface InflightUnsubscribeType extends UnsubscribePropsType {
  timeout: number;
}

function isEmpty(val: any) {
  return val === null || val === ""
}

function pruneEmpties(object: any) {
  for(const key in object) {
    const val = object[key];
    if(isEmpty(object[key])) {
      delete object[key];
    } else if(typeof val !== "string") {
      object[key] = pruneEmpties(val);
    }
  }
  return object
}

function recursiveUpdate(object: any, update: any) {
  if (object !== null && typeof object === "object") {
    const result = {...object}
    for(const key in update) {
      if(result.hasOwnProperty(key)) {
        const val = recursiveUpdate(result[key], update[key]);
        if(isEmpty(val)) {
          delete result[key];
        } else {
          result[key] = val;
        }
      } else {
        const val = update[key];
        if(!isEmpty(val)) {
          result[key] = typeof val === "string"? val: pruneEmpties(val);
        }
      }
    }
    return (Object.keys(result).length === 0)? null: result
  } else {
    if(isEmpty(update)) { return null; }
    return typeof update === "string"? update: pruneEmpties(update);
  }
}

const PING_INTERVAL = 20000;
const PING_ERROR = 500;
const MIN_RESPONSE_TIME = 1000;

export default function useMoteController(): MoteControllerType {
  const [state, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [error, setError] = useState<Error | null>(null);
  const stateRef = useRef<ConnectionState>(state);
  const webSocketRef = useRef<WebSocket | null>(null);
  const pingInterval = useRef<number>(0);
  const pingTimeout = useRef<number>(0);
  const disconnect = useRef<() => void>(noop);
  const starter = useRef<() => void>(() => void 0);
  const errorRef = useRef<Event | null>(null);
  const reconnectCount = useRef<number>(0);
  const pingResponse = useRef<boolean>(false);

  const outgoingMessages = useRef<InflightMessageType[]>([]);
  const outgoingSubscribes = useRef<InflightSubscribeType[]>([]);
  const outgoingUnsubscribes = useRef<InflightUnsubscribeType[]>([]);

  const listenersRef = useRef<Record<string, CallbackType[]>>({});
  const listenerDataRef = useRef<Record<string, NodeType[]>>({});
  const subscriptionsRef = useRef<Record<string, CallbackType[]>>({});
  const subscriptionDataRef = useRef<Record<string, NodeType>>({});

  const handlePublish = useCallback((published: PublishPropsType) => {
    const {topic} = published;
    if(subscriptionsRef.current.hasOwnProperty(topic)) {
      const message = decoder.decode(published.data);
      const isTree = topic.split("/").includes("+");
      const parsedMessage = isTree? JSON.parse(message): message;
      const updated = recursiveUpdate(subscriptionDataRef.current[topic], parsedMessage);
      const newObject = subscriptionDataRef.current[topic] = updated === null?
        (isTree? {}: null): updated;
      subscriptionsRef.current[topic].forEach(callback => callback(newObject));
    } else if(listenersRef.current.hasOwnProperty(topic)) {
      const message = decoder.decode(published.data);
      const data = listenerDataRef.current[topic] = [...(listenerDataRef.current[topic]?? []), message];
      listenersRef.current[topic].forEach(callback => callback(data));
    }
  }, []);

  const publishComplete = useCallback((id: number) => {
    outgoingMessages.current = outgoingMessages.current.filter(msg => {
      const found = msg.id === id;
      if (found) {
        window.clearTimeout(msg.timeout);
      }
      return !found;
    });
  }, []);

  const subComplete = useCallback((id: number) => {
    outgoingSubscribes.current = outgoingSubscribes.current.filter(msg => {
      const found = msg.id === id;
      if (found) {
        window.clearTimeout(msg.timeout);
      }
      return !found;
    });
  }, []);

  const unsubComplete = useCallback((id: number) => {
    outgoingUnsubscribes.current = outgoingUnsubscribes.current.filter(msg => {
      const found = msg.id === id;
      if (found) {
        window.clearTimeout(msg.timeout);
      }
      return !found;
    });
  }, []);

  const handleMessage = useCallback(({data}: MessageEvent) => {
    // need to use the ref bc we pass this to mr websocket so changes to the callback have no effect
    const connectionState = stateRef.current;
    const {current: client} = webSocketRef;
    if (!client) {
      return;
    }
    if (!(data instanceof ArrayBuffer)) {
      console.warn("Invalid message type", data);
      return;
    }
    const [packetTypeName, packetProps] = Packet.fromBytes(data);
    if (connectionState === ConnectionState.AUTHENTICATING) {
      if (packetTypeName !== "connack") {
        throw new Error("Expected connack");
      }
      const connackProps = packetProps as ConnectAcknowledgementPropsType;
      if (connackProps.returnCode !== ConnectAcknowledgementReturnCodeType.ACCEPTED) {
        throw new Error(`Connection Return Code: ${connackProps.returnCode}`);
      }
      pingInterval.current = window.setInterval(() => {
        pingResponse.current = false;
        client.send(pingRequest);
        console.log("PING");
        pingTimeout.current = window.setTimeout(() => {
          if (!pingResponse.current) {
            console.warn("No ping response from server!");
            disconnect.current?.();
          }
        }, MIN_RESPONSE_TIME);
      }, (PING_INTERVAL - PING_ERROR));
      setConnectionState(ConnectionState.AUTHENTICATED);
    } else {
      if (packetProps.hasOwnProperty("id")) {
        const packetIdData = packetProps as PacketWithIdDataType;
        const {id} = packetIdData;
        switch (packetTypeName) {
          case "publish":
            const publishProps = packetProps as PublishPropsType;
            switch (publishProps.qos) {
              case 1:
                client.send(Packet.toBytes("puback", publishProps));
                break;
              case 2:
                client.send(Packet.toBytes("pubrec", publishProps));
                // incoming.current.push(publishProps);
                break;
            }
            handlePublish(publishProps);
            break;
          case "pubrec":
            client.send(Packet.toBytes("pubrel", packetIdData));
            break;
          case "pubrel":
            client.send(Packet.toBytes("pubcomp", packetIdData));
            break;
          case "puback":
          case "pubcomp":
            publishComplete(id);
            break;
          case "suback":
            subComplete(id);
            break;
          case "unsuback":
            unsubComplete(id);
            break;
          default:
            console.error(`Unknown packet type ${packetTypeName}`);
        }
      } else if (packetTypeName === "pingresp") {
        console.log("PONG");
        pingResponse.current = true;
        window.clearTimeout(pingTimeout.current);
      } else {
        console.error(`Unknown packet type ${packetTypeName}`);
      }
    }
  }, [setConnectionState]);

  useEffect(() => {
    stateRef.current = state;
    const {current: client} = webSocketRef;
    if (!client) {
      return;
    }
    if (client && state === ConnectionState.AUTHENTICATING) {
      client.send(Packet.toBytes("connect", {
        clientId: `native-${Date.now().toString()}`,
        protocol: "mote",
        protocolVersion: 0,
        keepAlive: PING_INTERVAL,
        clean: true,
      }));
    }
  }, [state]);
  useEffect(() => {
    disconnect.current = noop;
    let expectClose = false;
    let startup = true;

    const start = async () => {
      const onMessageReceived = (message: MessageEvent) => {
        if (!expectClose) {
          handleMessage(message);
        }
      };
      const onConnectionStateChanged = (state: SetStateAction<ConnectionState>) => {
        if (!expectClose) {
          setConnectionState(state);
        }
      };
      if (startup) {
        setConnectionState(ConnectionState.CONNECTING);
        const client = new WebSocket(URL, "mqtt");
        webSocketRef.current = client;
        client.binaryType = "arraybuffer";
        let reconnectTimeout = 0;
        pingInterval.current = 0;
        pingTimeout.current = 0;
        client.addEventListener("open", () => {
          disconnect.current = (error?: boolean) => {
            console.log("Disconnecting!");
            onConnectionStateChanged(prev => (error && prev === ConnectionState.ERROR) ? prev : ConnectionState.DISCONNECTED);
            if (pingInterval.current) {
              clearInterval(pingInterval.current);
            }
            if (reconnectTimeout) {
              clearTimeout(reconnectTimeout);
            }
            try {
              webSocketRef.current?.send(Packet.toBytes("disconnect", {}));
              webSocketRef.current?.close();
            } catch {
            }
          };
          onConnectionStateChanged(ConnectionState.AUTHENTICATING);
        });
        client.addEventListener("close", () => {
          onConnectionStateChanged(prev => prev === ConnectionState.ERROR ? prev : ConnectionState.DISCONNECTED);
          console.log("Connection Closed!");
          if (expectClose) {
            return
          }
          if (reconnectCount.current < MAX_RECONNECT_ATTEMPTS) {
            reconnectTimeout = window.setTimeout(() => {
              console.log("Reconnecting...");
              reconnectCount.current++;
              starter.current();
            }, RECONNECT_INTERVAL_MS);
          } else {
            console.warn(`Could not connect!`);
          }
        });
        client.addEventListener("message", onMessageReceived);
        client.addEventListener("error", e => {
          if (expectClose) {
            onConnectionStateChanged(ConnectionState.DISCONNECTED);
          } else {
            errorRef.current = e;
            onConnectionStateChanged(ConnectionState.ERROR);
          }
        });
      }
    };

    starter.current = () => {
      if (!expectClose) {
        disconnect.current?.();
        start().then(noop);
      }
    };
    start().then(noop);
    return () => {
      expectClose = true;
      startup = false;
      disconnect.current?.();
    };
  }, []);

  const isMessageInflight = useCallback((id: number) => {
    for (const {id: i} of outgoingMessages.current) if (id === i) {
      return true;
    }
    return false;
  }, []);

  const getNextMessageId = useCallback(() => {
    for (let id = 1; id < 65534; id++) if (!isMessageInflight(id)) {
      return id;
    }
    throw new Error("Too many inflight messages!");
  }, [isMessageInflight]);

  const publish: PublisherType = useCallback((topic, message, options = {}) => {
    const data = encoder.encode("some test data")
    const {qos = 0, retain = false} = options;
    const {current: client} = webSocketRef;
    if (!client) {
      throw new Error("Publish: Not connected!");
    }
    const guarantee = qos > 0;
    let id;
    try {
      id = guarantee ? getNextMessageId() : 0;
    } catch (e) {
      setError(e as Error);
      disconnect.current?.();
      return;
    }
    const publishProps = {id, topic, data, qos, retain};
    if (guarantee) {
      const timeout = window.setTimeout(() => {
        console.error("QOS not met! Disconnecting!");
        // TODO resend packet with DUP flag
      }, MIN_RESPONSE_TIME);
      outgoingMessages.current.push({...publishProps, timeout});
    }
    client.send(Packet.toBytes("publish", publishProps));
  }, [getNextMessageId]);

  const isSubsrciptionInflight = useCallback((id: number) => {
    for (const {id: i} of outgoingSubscribes.current) if (id === i) {
      return true;
    }
    return false;
  }, []);

  const getNextSubscriptionId = useCallback(() => {
    for (let id = 1; id < 65534; id++) if (!isSubsrciptionInflight(id)) {
      return id;
    }
    throw new Error("Too many inflight subscriptions!");
  }, [isSubsrciptionInflight]);

  const subscribe = useCallback((...props: TopicWithOptionsType[]) => {
    const {current: client} = webSocketRef;
    if (!client) {
      throw new Error("Subscribe: Not connected!");
    }
    let id;
    try {
      id = getNextSubscriptionId();
    } catch (e) {
      setError(e as Error);
      return;
    }
    const subscribeProps = {id, topics: props};
    const timeout = window.setTimeout(() => {
      console.error("QOS not met! Disconnecting!");
      // TODO resend packet with DUP flag
    }, MIN_RESPONSE_TIME);
    outgoingSubscribes.current.push({...subscribeProps, timeout});
    client.send(Packet.toBytes("subscribe", subscribeProps));
  }, [getNextMessageId]);





  const isUnsubInflight = useCallback((id: number) => {
    for (const {id: i} of outgoingUnsubscribes.current) if (id === i) {
      return true;
    }
    return false;
  }, []);

  const getNextUnsubId = useCallback(() => {
    for (let id = 1; id < 65534; id++) if (!isUnsubInflight(id)) {
      return id;
    }
    throw new Error("Too many inflight unsubs!");
  }, [isSubsrciptionInflight]);

  const unsubscribe = useCallback((topic: string) => {
    const {current: client} = webSocketRef;
    if (!client) {
      throw new Error("Unsub: Not connected!");
    }
    let id;
    try {
      id = getNextUnsubId();
    } catch (e) {
      setError(e as Error);
      return;
    }
    const unsubProps = {id, topics: [topic]};
    const timeout = window.setTimeout(() => {
      console.error("QOS not met! Disconnecting!");
      // TODO resend packet with DUP flag
    }, MIN_RESPONSE_TIME);
    outgoingUnsubscribes.current.push({...unsubProps, timeout});
    client.send(Packet.toBytes("unsubscribe", unsubProps));
  }, [getNextMessageId]);

  const removeListener = useCallback((topic: string, callback: CallbackType) => {
    if(listenersRef.current.hasOwnProperty(topic)) {
      const callbacks = listenersRef.current[topic];
      const index = callbacks.indexOf(callback);
      if(index >= 0) {
        callbacks.splice(index, 1);
        if(callbacks.length === 0) {
          delete listenersRef.current[topic];
          if(stateRef.current === ConnectionState.AUTHENTICATED) {
            unsubscribe(topic);
          }
        }
      }
    }
  }, [unsubscribe]);

  const addListener = useCallback((topic: string, callback: CallbackType, qos: QosType=1) => {
    let data = null;
    if(listenersRef.current.hasOwnProperty(topic)) {
      listenersRef.current[topic].push(callback);
      data = listenerDataRef.current[topic]?? [];
      callback(data);
    } else {
      listenersRef.current[topic] = [callback];
      listenerDataRef.current[topic] = [];
      console.log("LISTEN", topic);
      subscribe({topic, qos, retain: false});
    }
    return [ () => removeListener(topic, callback), data]
  }, [subscribe]);

  const removeSubscription = useCallback((topic: string, callback: CallbackType) => {
    if(subscriptionsRef.current.hasOwnProperty(topic)) {
      const callbacks = subscriptionsRef.current[topic];
      const index = callbacks.indexOf(callback);
      if(index >= 0) {
        callbacks.splice(index, 1);
        if(callbacks.length === 0) {
          delete subscriptionsRef.current[topic];
          delete subscriptionDataRef.current[topic];
          if(stateRef.current === ConnectionState.AUTHENTICATED) {
            console.log("UNSUB", topic);
            unsubscribe(topic);
          }
        }
      }
    }
  }, [unsubscribe]);

  const addSubscription = useCallback((topic: string, callback: CallbackType, qos: QosType=1) => {
    let data = null;
    if(subscriptionsRef.current.hasOwnProperty(topic)) {
      subscriptionsRef.current[topic].push(callback);
      data = subscriptionDataRef.current[topic]?? null;
      callback(data);
    } else {
      subscriptionsRef.current[topic] = [callback];
      subscriptionDataRef.current[topic] = null;
      console.log("SUB", topic);
      subscribe({
        topic: `/${topic}`,
        qos, retain: false, // TODO: this will be used in the future
      });
    }
    return [ () => removeSubscription(topic, callback), data]
  }, [subscribe, removeSubscription]);

  const addSubscriptions = useCallback((topics: string[], callbacks: CallbackType[], qos: QosType=1) => {
    const results = [];
    const fullTopics = [];
    for(let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const callback = callbacks[i];
      let data = null;
      if (subscriptionsRef.current.hasOwnProperty(topic)) {
        subscriptionsRef.current[topic].push(callback);
        data = subscriptionDataRef.current[topic] ?? null;
        callback(data);
      } else {
        console.log("SUBZ", topic);
        subscriptionsRef.current[topic] = [callback];
        subscriptionDataRef.current[topic] = null;
        fullTopics.push(`/${topic}`);
      }
      results.push([() => removeSubscription(topic, callback), data]);
    }
    if(fullTopics.length === 0) {
      return results;
    }
    subscribe(...fullTopics.map(topic => ({topic, qos, retain: false /*TODO*/})));
    return results;
  }, [subscribe, removeSubscription]);

  const command = useCallback((topic: string, params: string = "") => {
    publish(topic, params, {qos: 2, retain: false})
  }, [publish]);
  const retain = useCallback((topic: string, message: string = "") => {
    publish(topic, message || "", {qos: 1, retain: true})
  }, [publish]);
  const retainTree = useCallback((topic: string, message: any) => {
    publish(topic + "/", JSON.stringify(message) || "", {qos: 1, retain: true})
  }, [publish]);
  const spray = useCallback((topic: string, message: string = "") => {
    publish(topic, message || "", {qos: 0, retain: false})
  }, [publish]);

  const reconnect = useCallback(() => {
    errorRef.current = null;
    if (state === ConnectionState.ERROR) {
    }
    setError(null);
  }, [state, setError]);

  const getSubscriptionData = useCallback((topic: string) => subscriptionDataRef.current[topic], []);
  return {
    state, publish, reconnect, subscribe, unsubscribe, getSubscriptionData,
    removeListener, addListener, removeSubscription, addSubscription,
    addSubscriptions, command, retain, retainTree, spray,
    error: error?.message ?? errorRef.current?.toString() ?? null,
  };
}