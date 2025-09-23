import {PublishPropsType} from "@/core/mote/packets/PublishPacket";

export default interface InflightMessageType extends PublishPropsType {
  timeout: number;
}