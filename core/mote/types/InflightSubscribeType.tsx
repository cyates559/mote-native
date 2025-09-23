import {SubscribePropsType} from "@/core/mote/packets/SubscribePacket";

export default interface InflightSubscribeType extends SubscribePropsType {
  timeout: number;
}