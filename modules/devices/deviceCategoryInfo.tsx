import {IconNameType} from "@/core";
import DeviceCategory from "@/modules/devices/types/DeviceCategory";

const deviceCategoryInfo: Record<DeviceCategory, { icon: IconNameType, name: string }> = {
  node: {icon: "Server", name: "Node"},
  micro: {icon: "Cpu", name: "Microcontroller"},
  unknown: {icon: "CircleHelp", name: "Unknown"},
}

export default deviceCategoryInfo;
