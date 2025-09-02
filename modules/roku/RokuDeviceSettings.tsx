import {Leaf, Loading, useModuleRouter, useStore} from "@/core";
import RokuDeviceType from "@/modules/roku/types/RokuDeviceType";
import {rokuDevicesKey} from "@/modules/roku/keys";

export default function RokuDeviceSettings() {
  const {nodeId, title} = useModuleRouter();
  const rokuDevices = useStore<Record<string, RokuDeviceType>>(rokuDevicesKey);
  if(rokuDevices === null) {
    return <Loading children="Loading Roku Device..."/>;
  }
  const rokuDevice = rokuDevices[nodeId];
  if(!rokuDevice) {
    return <Leaf text={`Roku Device (${nodeId}) not found!`} icon="SearchX"/>;
  }
}