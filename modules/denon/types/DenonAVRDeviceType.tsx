import {StaticRouteType} from "@/core";


export type DenonAVRActionNameType =
  "connect" |
  "on" |
  "sleep";

export const denonAVRActionNames: DenonAVRActionNameType[]= [
  "connect" ,
  "on" ,
  "sleep" ,
];

export type DenonAVRActionsMap = Record<DenonAVRActionNameType, () => void>;

export default interface DenonAVRDeviceType extends StaticRouteType {
  controllerId: string;
  topic: string;
  isConnected: boolean;
  isConnecting: boolean;
  isOn: boolean;
  powerState: "ON" | "STANDBY" | "UNKNOWN";
  togglePower: () => void;
  actions: DenonAVRActionsMap;
  host: string;

}