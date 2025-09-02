import {useStore} from "@/core";
import {devicesKey} from "@/modules/devices/keys";
import DeviceType from "@/modules/devices/types/DeviceType";

export default function useDevices() {
  return useStore<Record<string, DeviceType> | null>(devicesKey);
}
