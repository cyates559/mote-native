import ConnectionState from "@/features/mote/types/ConnectionState";
import RootPublisherType from "@/features/mote/types/PublisherType";
import {TopicWithOptionsType} from "@/features/mote/packets/SubscribePacket";
import CallbackType from "@/features/mote/types/CallbackType";
import QosType from "@/features/mote/QosType";
import {BranchNodeType} from "@/features/mote/types/NodeType";

export type PublisherType<T=string> = (topic: string, message?: T) => void;



export default interface MoteControllerType {
  state: ConnectionState;
  publish: RootPublisherType;
  error: string | null;
  reconnect: () => void;
  getSubscriptionData: (topic: string) => any;
  subscribe: (...props: TopicWithOptionsType[]) => void;
  unsubscribe: (topic: string) => void;
  removeListener: (topic: string, callback: CallbackType) => void;
  removeSubscription: (topic: string, callback: CallbackType) => void;
  addListener: (topic: string, callback: CallbackType, qos?: QosType) => void;
  addSubscription: (topic: string, callback: CallbackType, qos?: QosType) => void;
  addSubscriptions: (topics: string[], callbacks: CallbackType[], qos?: QosType) => void;
  command: PublisherType;
  retain: PublisherType;
  retainTree: PublisherType<BranchNodeType>;
  spray: PublisherType;
}
