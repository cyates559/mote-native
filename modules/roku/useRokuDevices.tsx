import {useStore} from "@/core";
import {rokuDevicesKey} from "./keys";
import RokuDeviceType from "./types/RokuDeviceType";

export default function useRokuDevices() {
  return useStore<Record<string, RokuDeviceType> | null>(rokuDevicesKey);
}
