import {StaticRouteType} from "@/core";
import DeviceCategory from "@/modules/devices/types/DeviceCategory";

export default interface DeviceType extends StaticRouteType {
  type: DeviceCategory;
  mac: string;
  hostname: string;
  topic: string;
  rolesTopic: string;
  isConnected: boolean;
  roles: string[];
  off: () => void;
  reboot: () => void;
  wake?: () => void;
  sleep?: () => void;
}
