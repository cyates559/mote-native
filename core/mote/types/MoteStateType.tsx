import ConnectionState from "@/core/mote/types/ConnectionState";
import InflightMessageType from "@/core/mote/types/InflightMessageType";
import InflightSubscribeType from "@/core/mote/types/InflightSubscribeType";
import InflightUnsubscribeType from "@/core/mote/types/InflightUnsubscribeType";
import CallbackType from "@/core/mote/types/CallbackType";
import NodeType from "@/core/mote/types/NodeType";

export default interface MoteStateType {
  connectionState: ConnectionState;
  socket?: WebSocket;
  retries: number;
  outgoingMessages: InflightMessageType[];
  outgoingSubscribes: InflightSubscribeType[];
  outgoingUnsubscribes: InflightUnsubscribeType[];
  pingTimeout: number;
  pongTimeout: number;
  error: string | null;
  listeners: Record<string, CallbackType[]>;
  listenerData: Record<string, NodeType[]>;
  subscriptions: Record<string, CallbackType[]>;
  subscriptionData: Record<string, NodeType>;
}