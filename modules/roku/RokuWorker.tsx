import {useSubscription, Storer, joinPaths, MoteControllerType, useMoteController} from "@/core";
import useDevices from "@/modules/devices/types/useDevices";
import {useMemo} from "react";
import DeviceType from "@/modules/devices/types/DeviceType";
import RokuDeviceType, {rokuActionNames, RokuActionsMap} from "./types/RokuDeviceType";
import {rokuControllerNamesKey, rokuDevicesKey, rokuOptionsKey} from "@/modules/roku/keys";
import RokuDevice from "@/modules/roku/RokuDevice";

type IdMap = Record<string, string>;

type RawDataType = Record<string, string | null>;

function parseRokuDevice(
  {command}: MoteControllerType, controllerId: string, nodeId: string, rokuData: RawDataType
): RokuDeviceType {
  const topic = joinPaths(
    "device",
    controllerId,
    "role/roku_controller/roku_device",
    nodeId,
  );
  const commandTopic = joinPaths(topic, "command");
  const isConnected = rokuData.on !== "0";
  const actions = rokuActionNames.reduce((actions, actionName) => {
    const actionTopic = joinPaths(commandTopic, actionName);
    actions[actionName] = () => command(actionTopic)
    return actions;
  }, {} as RokuActionsMap);
  return {
    controllerId,
    topic,
    isConnected,
    togglePower: isConnected? actions.off: actions.on,
    icon: "Tv",
    title: rokuData.name?? nodeId,
    nodeId: nodeId,
    Page: RokuDevice,
    actions,
  };
}

export default function RokuWorker() {
  const devices = useDevices();
  const rokuDeviceTree = useSubscription<Record<string, Record<string, Record<string, string | null>>>>(
    "device/+/role/roku_controller/roku_device/+/+"
  );
  const moteController = useMoteController();
  const rokuControllers = useMemo(() => devices && Object.keys(devices).reduce((rokuControllers, deviceId) => {
    const device = devices[deviceId];
    if(device.roles.includes("roku_controller")) {
      rokuControllers[deviceId] = device;
    }
    return rokuControllers;
  }, {} as Record<string, DeviceType>), [devices]);

  const rokuControllerIds = useMemo(() => rokuControllers && Object.keys(rokuControllers), [rokuControllers]);
  type BigChungus = [IdMap, Record<string, RokuDeviceType>, RokuDeviceType[]];
  const [rokuControllerNames, rokuDevices, rokuOptions] = useMemo(() => {
    if(!(rokuControllers && rokuDeviceTree)) {
      return [null, null, null];
    }
    return Object.keys(rokuControllers).reduce((chungus, controllerId) => {
      const [rokuControllerNames, rokuDevices, rokuOptions] = chungus;
      rokuControllerNames[controllerId] = rokuControllers![controllerId].title;
      for(const rokuDeviceId in rokuDeviceTree[controllerId]) {
        const rokuDevice = parseRokuDevice(
          moteController, controllerId, rokuDeviceId, rokuDeviceTree[controllerId][rokuDeviceId]
        );
        rokuOptions.push(rokuDevice);
        rokuDevices[rokuDeviceId] = rokuDevice;
      }
      return chungus;
    }, [{}, {}, []] as BigChungus);
  }, [rokuDeviceTree, rokuControllers, rokuControllerIds]);
  return <Storer {...{
    [rokuControllerNamesKey]: rokuControllerNames,
    [rokuDevicesKey]: rokuDevices,
    [rokuOptionsKey]: rokuOptions,
  }}/>
}
