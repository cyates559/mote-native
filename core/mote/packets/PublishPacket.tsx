import BasePacket, {FieldListType} from "@/core/mote/packets/BasePacket";
import QosType from "@/core/mote/types/QosType";
import packetFields from "@/core/mote/packets/packetFields";


export interface PublishPropsType {
  id: number;
  topic: string;
  data: Uint8Array;
  qos: QosType;
  retain: boolean;
}

export interface PublishPayloadType {
  id: number;
  topic: string;
  data: Uint8Array;
}

export default class PublishPacket extends BasePacket<PublishPropsType, PublishPayloadType> {
  type = 3;
  parseProps(props: PublishPropsType): [PublishPayloadType, number] {
    const {topic, data, qos, id, retain} = props;
    let flags = 0;
    //RETAIN
    if(retain) {
      flags |= 1
    } else {
      flags &= ~1
    }
    // ================
    // QOS
    flags &= 0xF9;
    flags |= qos << 1;
    // ================
    return [{topic, data, id}, flags];
  };
  parsePayload(payload: PublishPayloadType, flags: number): PublishPropsType {
    const {id, topic, data} = payload;
    const retain = !!(flags & 1);
    const qos = (flags & 6) >> 1 as QosType;
    return {
      id,
      topic,
      data,
      qos,
      retain,
    };
  }
  getFields = () => [
    ["topic", packetFields.dynamicString],
    ["id", packetFields.packetId, ({headerFlags}) => ((headerFlags & 6) >> 1) > 0],
    ["data", packetFields.remainingBytes],
  ] as FieldListType<PublishPayloadType>;
}
