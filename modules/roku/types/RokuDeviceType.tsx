import {StaticRouteType} from "@/core";


export type RokuActionNameType =
  "on" |
  "off" |
  "back" |
  "info" |
  "home" |
  "volume_up" |
  "volume_down" |
  "up" |
  "left" |
  "right" |
  "down" |
  "select";

export const rokuActionNames: RokuActionNameType[]= [
  "on" ,
  "off" ,
  "back" ,
  "info" ,
  "home" ,
  "volume_up" ,
  "volume_down" ,
  "up" ,
  "left" ,
  "right" ,
  "down" ,
  "select",
];

export type RokuActionsMap = Record<RokuActionNameType, () => void>;

export default interface RokuDeviceType extends StaticRouteType {
  controllerId: string;
  topic: string;
  isConnected: boolean;
  togglePower: () => void;
  actions: RokuActionsMap;
  host: string;
}