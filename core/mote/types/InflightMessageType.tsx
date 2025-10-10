import {PublishPropsType} from "@/core/mote/packets/PublishPacket";

export interface PublishResponseType {
  ok: boolean;
}

export default interface InflightMessageType extends PublishPropsType {
  timeout: number;
  onResponse: (response: PublishResponseType) => void;
}