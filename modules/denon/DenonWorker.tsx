import {useSubscription, Storer, joinPaths, MoteControllerType, useMote} from "@/core";
import useDevices from "@/modules/devices/types/useDevices";
import {useMemo} from "react";
import DeviceType from "@/modules/devices/types/DeviceType";
import DenonAVRDeviceType, {denonAVRActionNames, DenonAVRActionsMap} from "./types/DenonAVRDeviceType";
import {denonAVRControllerNamesKey, denonAVRDevicesKey, denonOptionsKey} from "@/modules/denon/keys";
import DenonAVRDevice from "@/modules/denon/DenonAVRDevice";

type IdMap = Record<string, string>;

type RawDataType = Record<string, string | null>;

function parseAVRDevice(
  {command}: MoteControllerType, controllerId: string, nodeId: string, denonAVRData: RawDataType
): DenonAVRDeviceType {
  const topic = joinPaths(
    "device",
    controllerId,
    "role/denon_avr/avr_device",
    nodeId,
  );
  const commandTopic = joinPaths(topic, "command");
  const isConnected =  denonAVRData.connected === "2";
  const isConnecting =  denonAVRData.connected === "1";
  const actions = denonAVRActionNames.reduce((actions, actionName) => {
    const actionTopic = joinPaths(commandTopic, actionName);
    actions[actionName] = () => command(actionTopic)
    return actions;
  }, {} as DenonAVRActionsMap);
  const isOn = denonAVRData.power_state === "ON";
  return {
    controllerId,
    topic,
    isConnecting,
    isConnected,
    isOn,
    powerState: (denonAVRData.power_state as DenonAVRDeviceType["powerState"])?? "UNKNOWN",
    togglePower: isOn? actions.sleep: actions.on,
    icon: "Speaker",
    title: denonAVRData.name?? nodeId,
    nodeId: nodeId,
    actions,
    host: denonAVRData.host?? "",
  };
}

export default function DenonWorker() {
  const devices = useDevices();
  const denonAVRDeviceTree = useSubscription<Record<string, Record<string, Record<string, string | null>>>>(
    "device/+/role/denon_avr/avr_device/+/+"
  );
  const moteController = useMote();
  const denonAVRControllers = useMemo(() => devices && Object.keys(devices).reduce((denonAVRControllers, deviceId) => {
    const device = devices[deviceId];
    if(device.roles.includes("denon_avr")) {
      denonAVRControllers[deviceId] = device;
    }
    return denonAVRControllers;
  }, {} as Record<string, DeviceType>), [devices]);
  const denonAVRControllerIds = useMemo(() => {
    return denonAVRControllers && Object.keys(denonAVRControllers);
  }, [denonAVRControllers]);
  type BigChungus = [IdMap, Record<string, DenonAVRDeviceType>, DenonAVRDeviceType[]];
  const [denonAVRControllerNames, denonAVRDevices, denonAVROptions] = useMemo(() => {
    if(!(denonAVRControllers && denonAVRDeviceTree)) {
      return [null, null, null];
    }
    return Object.keys(denonAVRControllers).reduce((chungus, controllerId) => {
      const [denonAVRControllerNames, denonAVRDevices, denonAVROptions] = chungus;
      denonAVRControllerNames[controllerId] = denonAVRControllers![controllerId].title;
      for(const denonAVRDeviceId in denonAVRDeviceTree[controllerId]) {
        const denonAVRDevice = parseAVRDevice(
          moteController, controllerId, denonAVRDeviceId, denonAVRDeviceTree[controllerId][denonAVRDeviceId]
        );
        denonAVROptions.push(denonAVRDevice);
        denonAVRDevices[denonAVRDeviceId] = denonAVRDevice;
      }
      return chungus;
    }, [{}, {}, []] as BigChungus);
  }, [denonAVRDeviceTree, denonAVRControllers, denonAVRControllerIds]);
  return <Storer {...{
    [denonAVRControllerNamesKey]: denonAVRControllerNames,
    [denonAVRDevicesKey]: denonAVRDevices,
    [denonOptionsKey]: denonAVROptions,
  }}/>
}
