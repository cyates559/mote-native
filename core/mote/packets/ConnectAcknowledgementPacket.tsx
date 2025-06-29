import packetFields from "@/core/mote/packets/packetFields";
import BasePacket, {FieldListType} from "@/core/mote/packets/BasePacket";

export enum ConnectAcknowledgementReturnCodeType {
  ACCEPTED = 0x00,
  PROTOCOL_VERSION_REJECTED = 0x01,
  IDENTIFIER_REJECTED = 0x02,
  SERVER_UNAVAILABLE = 0x03,
  USERNAME_PASSWORD_REJECTED = 0x04,
  NOT_AUTHORIZED = 0x05,
}

export interface ConnectAcknowledgementPropsType {
  sessionParent: number;
  returnCode: ConnectAcknowledgementReturnCodeType;
}

export default class ConnectAcknowledgementPacket extends BasePacket<ConnectAcknowledgementPropsType> {
  type = 2;
  parseProps = (props: ConnectAcknowledgementPropsType): [ConnectAcknowledgementPropsType, number] => [props, 0];
  parsePayload = (payload: ConnectAcknowledgementPropsType): ConnectAcknowledgementPropsType => payload;
  getFields = () => [
    ["sessionParent", packetFields.singleInt],
    ["returnCode", packetFields.singleInt],
  ] as FieldListType<ConnectAcknowledgementPropsType>;
}
