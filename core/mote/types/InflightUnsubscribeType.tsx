import {UnsubscribePropsType} from "@/core/mote/packets/UnsubscribePacket";

export default interface InflightUnsubscribeType extends UnsubscribePropsType {
  timeout: number;
}