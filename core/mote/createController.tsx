import MoteStateType from "@/core/mote/types/MoteStateType";
import MoteStateDispatchType from "@/core/mote/types/MoteStateDispatchType";
import PublisherType from "@/core/mote/types/PublisherType";
import Packet from "@/core/mote/packets/Packet";
import {TopicWithOptionsType} from "@/core/mote/packets/SubscribePacket";
import ConnectionState from "@/core/mote/types/ConnectionState";
import CallbackType from "@/core/mote/types/CallbackType";
import QosType from "@/core/mote/types/QosType";
import {SubscriptionResultPair} from "@/core";
import NodeType from "@/core/mote/types/NodeType";

const MIN_RESPONSE_TIME = 1000;
const encoder = new TextEncoder();

export default function createController(stateRef: { current: MoteStateType }, setState: MoteStateDispatchType) {
  const isMessageInflight = (id: number) => {
    for (const {id: i} of stateRef.current.outgoingMessages) if (id === i) {
      return true;
    }
    return false;
  };
  const getNextMessageId = () => {
    for (let id = 1; id < 65534; id++) if (!isMessageInflight(id)) {
      return id;
    }
    throw new Error("Too many inflight messages!");
  };
  const publish: PublisherType = (topic, message, options = {}) => {
    const {socket, connectionState, outgoingMessages} = stateRef.current;
    if (socket?.readyState !== WebSocket.OPEN) {
      return;
    } else if(connectionState !== ConnectionState.AUTHENTICATED) {
      console.log("Publish failed: Not Authenticated!");
    }
    const data = encoder.encode(message)
    const {qos = 0, retain = false} = options;
    const guarantee = qos > 0;
    let id;
    try {
      id = guarantee ? getNextMessageId() : 1;
    } catch (e) {
      setState(state => ({...state, error: (e as any).toString()}));
      socket.close();
      return;
    }
    const publishProps = {id, topic, data, qos, retain};
    if (guarantee) {
      const timeout = window.setTimeout(() => {
        console.error("QOS not met! Disconnecting! (1)");
        // TODO resend packet with DUP flag
      }, MIN_RESPONSE_TIME);
      outgoingMessages.push({...publishProps, timeout});
    }
    socket.send(Packet.toBytes("publish", publishProps));
  }
  const isSubscriptionInflight = (id: number) => {
    for (const {id: i} of stateRef.current.outgoingSubscribes) if (id === i) {
      return true;
    }
    return false;
  };
  const getNextSubscriptionId = () => {
    for (let id = 1; id < 65534; id++) if (!isSubscriptionInflight(id)) {
      return id;
    }
    throw new Error("Too many inflight subscriptions!");
  };
  const subscribe = (...props: TopicWithOptionsType[]) => {
    const {socket, connectionState, outgoingSubscribes} = stateRef.current;
    if (socket?.readyState !== WebSocket.OPEN) {
      return;
    } else if(connectionState !== ConnectionState.AUTHENTICATED) {
      console.log("Subscribe failed: Not Authenticated!");
    }
    let id;
    try {
      id = getNextSubscriptionId();
    } catch (e) {
      setState(state => ({...state, error: (e as any).toString()}));
      return;
    }
    const subscribeProps = {id, topics: props};
    const timeout = window.setTimeout(() => {
      console.error("QOS not met! Disconnecting! (2)");
      // TODO resend packet with DUP flag
    }, MIN_RESPONSE_TIME);
    outgoingSubscribes.push({...subscribeProps, timeout});
    socket.send(Packet.toBytes("subscribe", subscribeProps));
  };
  const isUnsubInflight = (id: number) => {
    for (const {id: i} of stateRef.current.outgoingUnsubscribes) if (id === i) {
      return true;
    }
    return false;
  };
  const getNextUnsubId = () => {
    for (let id = 1; id < 65534; id++) if (!isUnsubInflight(id)) {
      return id;
    }
    throw new Error("Too many inflight unsubs!");
  };
  const unsubscribe = (topic: string) => {
    const {socket, connectionState, outgoingUnsubscribes} = stateRef.current;
    if (socket?.readyState !== WebSocket.OPEN) {
      return;
    } else if(connectionState !== ConnectionState.AUTHENTICATED) {
      console.log("Unsub failed: Not Authenticated!");
    }
    let id;
    try {
      id = getNextUnsubId();
    } catch (e) {
      setState(state => ({...state, error: (e as any).toString()}));
      return;
    }
    const unsubProps = {id, topics: [topic]};
    const timeout = window.setTimeout(() => {
      console.error("QOS not met! Disconnecting! (3)");
      // TODO resend packet with DUP flag
    }, MIN_RESPONSE_TIME);
    outgoingUnsubscribes.push({...unsubProps, timeout});
    try {
      socket.send(Packet.toBytes("unsubscribe", unsubProps));
    } catch (e) {
      console.log("Unsub Error", e);
    }
  };
  const removeListener = (topic: string, callback: CallbackType) => {
    if (stateRef.current.listeners.hasOwnProperty(topic)) {
      const callbacks = stateRef.current.listeners[topic];
      const index = callbacks.indexOf(callback);
      if (index >= 0) {
        callbacks.splice(index, 1);
        if (callbacks.length === 0) {
          delete stateRef.current.listeners[topic];
          if (stateRef.current.connectionState === ConnectionState.AUTHENTICATED) {
            console.log("Mute:", topic);
            unsubscribe(topic);
          }
        }
      }
    }
  };
  const addListener = (topic: string, callback: CallbackType, qos: QosType = 1) => {
    let data = null;
    if (stateRef.current.listeners.hasOwnProperty(topic)) {
      stateRef.current.listeners[topic].push(callback);
      data = stateRef.current.listenerData[topic] ?? [];
      callback(data);
    } else {
      stateRef.current.listeners[topic] = [callback];
      stateRef.current.listenerData[topic] = [];
      console.log("Listen:", topic);
      subscribe({topic, qos, retain: false});
    }
    return [() => removeListener(topic, callback), data]
  };
  const removeSubscription = (topic: string, callback: CallbackType) => {
    if (stateRef.current.subscriptions.hasOwnProperty(topic)) {
      const callbacks = stateRef.current.subscriptions[topic];
      const index = callbacks.indexOf(callback);
      if (index >= 0) {
        callbacks.splice(index, 1);
        if (callbacks.length === 0) {
          delete stateRef.current.subscriptions[topic];
          delete stateRef.current.subscriptionData[topic];
          if (stateRef.current.connectionState === ConnectionState.AUTHENTICATED) {
            console.log("Unsubscribe:", topic);
            unsubscribe(topic);
          }
        }
      }
    }
  };
  const addSubscription = (topic: string, callback: CallbackType, qos: QosType = 1): SubscriptionResultPair => {
    let data = null;
    if (stateRef.current.subscriptions.hasOwnProperty(topic)) {
      stateRef.current.subscriptions[topic].push(callback);
      data = stateRef.current.subscriptionData[topic] ?? null;
      callback(data);
    } else {
      stateRef.current.subscriptions[topic] = [callback];
      stateRef.current.subscriptionData[topic] = null;
      console.log("Subscribe:", topic);
      subscribe({
        topic: `/${topic}`,
        qos, retain: false, // TODO: this will be used in the future
      });
    }
    return [() => removeSubscription(topic, callback), data];
  };
  const addSubscriptions = (topics: string[], callbacks: CallbackType[], qos: QosType = 1) => {
    const results: [() => void, string | { [key: string]: NodeType } | null][] = [];
    const fullTopics = [];
    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const callback = callbacks[i];
      let data = null;
      if (stateRef.current.subscriptions.hasOwnProperty(topic)) {
        stateRef.current.subscriptions[topic].push(callback);
        data = stateRef.current.subscriptionData[topic] ?? null;
        callback(data);
      } else {
        console.log("Multi Subscribe:", topic);
        stateRef.current.subscriptions[topic] = [callback];
        stateRef.current.subscriptionData[topic] = null;
        fullTopics.push(`/${topic}`);
      }
      results.push([() => removeSubscription(topic, callback), data]);
    }
    if (fullTopics.length === 0) {
      return results;
    }
    subscribe(...fullTopics.map(topic => ({topic, qos, retain: false /*TODO*/})));
    return results;
  };
  return {
    publish, subscribe, unsubscribe, removeListener, addListener,
    removeSubscription, addSubscription, addSubscriptions,
    command: (topic: string, params?: string | null) => {
      publish(topic, params ?? "", {qos: 2, retain: false})
    },
    retain: (topic: string, message?: string | null) => {
      publish(topic, message ?? "", {qos: 1, retain: true})
    },
    retainTree: (topic: string, message: any) => {
      publish(topic + "/", JSON.stringify(message) ?? "", {qos: 1, retain: true})
    },
    spray: (topic: string, message?: string | null) => {
      publish(topic, message ?? "", {qos: 0, retain: false})
    },
    reconnect: () => setState(state => {
      return {...state, error: null, retries: 0};
    }),
    getSubscriptionData: (topic: string) => {
      return stateRef.current.subscriptionData[topic];
    },
    getCachedEvents: (topic: string) => {
      return stateRef.current.listenerData[topic];
    },
  };
}