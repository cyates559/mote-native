import BasePacket, {FieldListType} from "@/features/mote/packets/BasePacket";
import packetFields from "@/features/mote/packets/packetFields";
import PacketDynamicList from "@/features/mote/packets/packetFields/PacketDynamicList";
import PacketSingleInt from "@/features/mote/packets/packetFields/PacketSingleInt";
import QosType from "@/features/mote/QosType";

export type SubscribeResponseCode = 0x80 | QosType;

export interface SubscribeResponsePayloadType {
  code: SubscribeResponseCode;
}

export interface SubscribeAcknowledgementPropsType {
  id: number;
  responseCodes: SubscribeResponseCode[];
}

export interface SubscribeAcknowledgementPayloadType {
  id: number;
  responseCodes: SubscribeResponsePayloadType[];
}

const responseCodeField = new PacketSingleInt<SubscribeResponseCode>();

const responseCodesField = new class extends PacketDynamicList<SubscribeResponsePayloadType> {
  getFields = (): FieldListType<SubscribeResponsePayloadType> => [
    ["code", responseCodeField],
  ];
};

export default class SubscribeAcknowledgementPacket extends BasePacket<SubscribeAcknowledgementPropsType, SubscribeAcknowledgementPayloadType> {
  type = 9;
  parseProps(props: SubscribeAcknowledgementPropsType): [SubscribeAcknowledgementPayloadType, number] {
    const {responseCodes, ...rest} = props;
    return [{...rest, responseCodes: responseCodes.map(code => ({code}))}, 0];
  }
  parsePayload(payload: SubscribeAcknowledgementPayloadType): SubscribeAcknowledgementPropsType {
    const {responseCodes, ...rest} = payload;
    return {...rest, responseCodes: responseCodes.map(({code}) => code)};
  }

  getFields = (): FieldListType<SubscribeAcknowledgementPayloadType> => [
    ["id", packetFields.packetId],
    ["responseCodes", responseCodesField],
  ];
}
