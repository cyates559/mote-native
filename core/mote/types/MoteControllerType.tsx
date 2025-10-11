import ConnectionState from "@/core/mote/types/ConnectionState";
import RootPublisherType from "@/core/mote/types/PublisherType";
import {TopicWithOptionsType} from "@/core/mote/packets/SubscribePacket";
import CallbackType from "@/core/mote/types/CallbackType";
import QosType from "@/core/mote/types/QosType";
import NodeType, {BranchNodeType} from "@/core/mote/types/NodeType";
import {PublishResponseType} from "@/core/mote/types/InflightMessageType";

export type GenericPublisherType<T=string | null | undefined> =
  (topic: string, message?: T) => Promise<PublishResponseType>;

export type SubscriptionResultPairType = [() => void, string | {[key: string]: NodeType} | null];

export default interface MoteControllerType {
  state: ConnectionState;
  publish: RootPublisherType;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
  getCachedEvents: (topic: string) => any[];
  getSubscriptionData: (topic: string) => any;
  subscribe: (...props: TopicWithOptionsType[]) => void;
  unsubscribe: (topic: string) => void;
  removeListener: (topic: string, callback: CallbackType) => void;
  removeSubscription: (topic: string, callback: CallbackType) => void;
  addListener: (topic: string, callback: CallbackType, qos?: QosType) => void;
  addSubscription: (topic: string, callback: CallbackType, qos?: QosType) => SubscriptionResultPairType;
  addSubscriptions: (topics: string[], callbacks: CallbackType[], qos?: QosType) => SubscriptionResultPairType[];
  command: GenericPublisherType;
  retain: GenericPublisherType;
  retainTree: GenericPublisherType<BranchNodeType>;
  spray: GenericPublisherType;
}
