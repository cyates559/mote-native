import BasePacket, {FieldListType} from "@/core/mote/packets/BasePacket";
import packetFields from "@/core/mote/packets/packetFields";
import QosType from "@/core/mote/types/QosType";
import PacketDynamicList from "@/core/mote/packets/packetFields/PacketDynamicList";

export interface TopicWithOptionsType {
  topic: string;
  qos: QosType;
  retain: boolean;
}

export interface SubscribePropsType {
  id: number;
  topics: TopicWithOptionsType[];
}

export interface TopicWithFlagsType {
  topic: string;
  flags: number;
}

export interface SubscribePayloadType {
  id: number;
  topics: TopicWithFlagsType[];
}

export class TopicsWithQosPacketField extends PacketDynamicList<TopicWithFlagsType> {
  getFields = (): FieldListType<TopicWithFlagsType> => [
    ["topic", packetFields.dynamicString],
    ["flags", packetFields.singleInt],
  ];
}

export default class SubscribePacket extends BasePacket<SubscribePropsType, SubscribePayloadType> {
  type = 8;

  parseProps(props: SubscribePropsType): [SubscribePayloadType, number] {
    const {topics: topicsProps, ...rest} = props;
    const topics = topicsProps.map(({topic, qos, retain}) => ({
      topic,
      flags: (retain? 4: 0) | qos,
    }));
    return [{topics, ...rest}, 0];
  }

  parsePayload(payload: SubscribePayloadType): SubscribePropsType {
    const {topics: topicsPayload, ...rest} = payload;
    const topics = topicsPayload.map(({topic, flags}) => ({
      topic,
      retain: !!(flags & 4),
      qos: (flags & 3) as QosType
    }));
    return {topics, ...rest};
  }

  getFields = (): FieldListType<SubscribePayloadType> => [
    ["id", packetFields.packetId],
    ["topics", new TopicsWithQosPacketField()],
  ];
}
