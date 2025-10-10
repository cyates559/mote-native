import {PublishPropsType} from "@/core/mote/packets/PublishPacket";
import Packet from "@/core/mote/packets/Packet";
import ConnectionState from "@/core/mote/types/ConnectionState";
import {
  ConnectAcknowledgementPropsType,
  ConnectAcknowledgementReturnCodeType
} from "@/core/mote/packets/ConnectAcknowledgementPacket";
import {PacketWithIdDataType} from "@/core/mote/packets/PacketWithId";
import MoteStateType from "@/core/mote/types/MoteStateType";
import recursiveUpdate from "@/core/mote/recursiveUpdate";
import MoteStateDispatchType from "@/core/mote/types/MoteStateDispatchType";

const HOST = process.env.EXPO_PUBLIC_MOTE_HOST || window.location.hostname;
const PROTOCOL = process.env.EXPO_PUBLIC_MOTE_PROTOCOL || (window.location.protocol === "https:" ? "wss" : "ws");
const PORT = process.env.EXPO_PUBLIC_MOTE_PORT || null;
const PATH = process.env.REACT_APP_MOTE_PATH || "/mote/";
const URL = `${PROTOCOL}://${HOST}:${PORT? `:${PORT}`: ""}${PATH}`;
const pingRequest = Packet.toBytes("pingreq", {});
const decoder = new TextDecoder();

const PING_INTERVAL = 20000;
const PING_ERROR = 500;
const MIN_RESPONSE_TIME = 1200;

/*
 * State Machine for Mote Connection
 */
export default function handleStateChange(stateRef: {current: MoteStateType}, setState: MoteStateDispatchType) {
  switch(stateRef.current.connectionState) {
    default:
      return;
    case ConnectionState.NOT_CONNECTED:
      const socket = new WebSocket(URL, "mqtt");
      socket.binaryType = "arraybuffer";
      setState(state => ({
        ...state,
        connectionState: ConnectionState.CONNECTING,
        socket,
        pingTimeout: 0,
      }));
      socket.addEventListener("open", () => {
        setState(state => {
          window.clearTimeout(state.pingTimeout);
          return {...state, connectionState: ConnectionState.AUTHENTICATING, pingTimeout: 0};
        });
        setTimeout(() => stateRef.current.socket?.send(Packet.toBytes("connect", {
          clientId: `native-${Date.now().toString()}`,
          protocol: "mote",
          protocolVersion: 0,
          keepAlive: PING_INTERVAL,
          clean: true,
        })));
      });
      socket.addEventListener("close", () => {
        setState(state => {
          if(state.connectionState === ConnectionState.DISCONNECTED) {
            return state;
          }
          [state.outgoingMessages, state.outgoingSubscribes, state.outgoingUnsubscribes].forEach(list =>
            list.forEach(({timeout}) => window.clearTimeout(timeout))
          );
          return {
            ...state,
            retries: state.retries + 1,
            connectionState: ConnectionState.DISCONNECTED,
            outgoingMessages: [],
            outgoingSubscribes: [],
            outgoingUnsubscribes: [],
          };
        });
      });
      socket.addEventListener("message", ({data}: MessageEvent) => {
        if (!(data instanceof ArrayBuffer)) {
          console.warn("Invalid message type", data);
        } else if (socket.readyState !== WebSocket.OPEN) {
          console.error("Socket not available!")
        } else if(socket != stateRef.current.socket) {
          console.warn("Socket has been replaced!");
        }
        const [packetTypeName, packetProps] = Packet.fromBytes(data);
        const {connectionState} = stateRef.current;
        if (connectionState === ConnectionState.AUTHENTICATING) {
          if (packetTypeName !== "connack") {
            throw new Error("Expected connack");
          }
          const connackProps = packetProps as ConnectAcknowledgementPropsType;
          if (connackProps.returnCode !== ConnectAcknowledgementReturnCodeType.ACCEPTED) {
            throw new Error(`Connection Return Code: ${connackProps.returnCode}`);
          }
          setState(state => ({
            ...state,
            connectionState: ConnectionState.AUTHENTICATED,
          }));
        } else if(connectionState !== ConnectionState.AUTHENTICATED) {
          console.warn("Not authenticated!", packetTypeName, connectionState);
        } else if (packetProps.hasOwnProperty("id")) {
          const packetIdData = packetProps as PacketWithIdDataType;
          const {id} = packetIdData;
          switch (packetTypeName) {
            case "publish":
              const publishProps = packetProps as PublishPropsType;
              switch (publishProps.qos) {
                case 1:
                  socket.send(Packet.toBytes("puback", publishProps));
                  break;
                case 2:
                  socket.send(Packet.toBytes("pubrec", publishProps));
                  // incoming.current.push(publishProps);
                  break;
              }
              const {topic, data} = publishProps;
              const {subscriptions, subscriptionData, listeners, listenerData} = stateRef.current;
              if (subscriptions.hasOwnProperty(topic)) {
                const message = decoder.decode(data);
                const isTree = topic.split("/").includes("+");
                const parsedMessage = isTree ? JSON.parse(message) : message;
                const updated = recursiveUpdate(subscriptionData[topic], parsedMessage);
                const newObject = subscriptionData[topic] = updated === null ?
                  (isTree ? {} : null) : updated;
                subscriptions[topic].forEach(callback => callback(newObject));
              } else if (listeners.hasOwnProperty(topic)) {
                const message = decoder.decode(data);
                const otherData = listenerData[topic] = [...(listenerData[topic] ?? []), message];
                listeners[topic].forEach(callback => callback(otherData));
              }
              break;
            case "pubrec":
              socket.send(Packet.toBytes("pubrel", packetIdData));
              break;
            case "pubrel":
              socket.send(Packet.toBytes("pubcomp", packetIdData));
              break;
            case "puback":
            case "pubcomp":
              stateRef.current.outgoingMessages = stateRef.current.outgoingMessages.filter(msg => {
                const found = msg.id === id;
                if (found) {
                  window.clearTimeout(msg.timeout);
                  msg.onResponse({ok: true});
                }
                return !found;
              });
              break;
            case "suback":
              stateRef.current.outgoingSubscribes = stateRef.current.outgoingSubscribes.filter(msg => {
                const found = msg.id === id;
                if (found) {
                  window.clearTimeout(msg.timeout);
                }
                return !found;
              });
              break;
            case "unsuback":
              stateRef.current.outgoingUnsubscribes = stateRef.current.outgoingUnsubscribes.filter(msg => {
                const found = msg.id === id;
                if (found) {
                  window.clearTimeout(msg.timeout);
                }
                return !found;
              });
              break;
            default:
              console.error(`Unknown packet type ${packetTypeName}`);
          }
        } else if (packetTypeName === "pingresp") {
          console.log("Received PINGRESP", stateRef.current.pongTimeout);
          window.clearTimeout(stateRef.current.pongTimeout);
          setState(state => ({...state, pongTimeout: 0}));
        } else {
          console.error(`Unknown packet type ${packetTypeName}`);
        }
      });
      return;
    case ConnectionState.AUTHENTICATED:
      if(!(stateRef.current.pingTimeout || stateRef.current.pongTimeout)) {
        const pingTimeout = window.setTimeout(() => {
          if(stateRef.current.socket?.readyState === WebSocket.OPEN) {
            stateRef.current.socket.send(pingRequest);
            console.log("Sent PINGREQ");
            stateRef.current.pingTimeout = 0;
            stateRef.current.pongTimeout = window.setTimeout(() => setState(state => {
              if(state.socket?.readyState === WebSocket.OPEN) {
                console.log("Closing connection (timeout)");
                state.socket.close();
              }
              return {
                ...state,
                connectionState: ConnectionState.DISCONNECTED,
                pongTimeout: 0,
                error: "Pong timeout!",
              };
            }), MIN_RESPONSE_TIME);
          }
        }, PING_INTERVAL + PING_ERROR);
        window.setTimeout(() => setState(state => ({...state, pingTimeout})));
      }
      return;
  }
}