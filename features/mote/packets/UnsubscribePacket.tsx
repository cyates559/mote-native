import BasePacket, {FieldListType} from "@/features/mote/packets/BasePacket";
import packetFields from "@/features/mote/packets/packetFields";
import PacketDynamicList from "@/features/mote/packets/packetFields/PacketDynamicList";

export interface UnsubscribeRequestType {
  topic: string;
}

export interface UnsubscribePropsType {
  id: number;
  topics: string[];
}

export interface UnsubscribePayloadType {
  id: number;
  topics: UnsubscribeRequestType[];
}


const unsubscribeRequestField = new class extends PacketDynamicList<UnsubscribeRequestType> {
  getFields = (): FieldListType<UnsubscribeRequestType> => [
    ["topic", packetFields.dynamicString],
  ];
};

export default class UnsubscribePacket extends BasePacket<UnsubscribePropsType, UnsubscribePayloadType> {
  type = 10;
  parseProps(props: UnsubscribePropsType): [UnsubscribePayloadType, number] {
    const {topics, ...rest} = props;
    return [{...rest, topics: topics.map(topic => ({topic}))}, 0];
  }
  parsePayload(payload: UnsubscribePayloadType): UnsubscribePropsType {
    const {topics, ...rest} = payload;
    return {...rest, topics: topics.map(({topic}) => topic)};
  }
  getFields = (): FieldListType<UnsubscribePayloadType> => [
    ["id", packetFields.packetId],
    ["topics", unsubscribeRequestField],
  ];
}
