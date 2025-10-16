import {useStore} from "@/core";
import {denonAVRDevicesKey} from "./keys";
import DenonAVRDeviceType from "@/modules/denon/types/DenonAVRDeviceType";

export default function useDenonAVRDevices() {
  return useStore<Record<string, DenonAVRDeviceType> | null>(denonAVRDevicesKey);
}
