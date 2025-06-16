import {useMemo} from "react";
import {deviceOptionsKey, devicesKey, deviceTreeKey, roleTreeKey} from "./keys";
import useStorer from "@/features/store/useStorer";
import useMote from "@/features/mote/useMote";
import useSubscription from "@/features/mote/useSubscription";
import DeviceType from "@/modules/devices/types/DeviceType";
import {BranchNodeType} from "@/features/mote/types/NodeType";
import MoteControllerType from "@/features/mote/types/MoteControllerType";
import joinPaths from "@/utils/joinPaths";
import deviceCategoryInfo from "@/modules/devices/deviceCategoryInfo";
import DeviceCategory from "@/modules/devices/types/DeviceCategory";
import DeviceSettings from "@/modules/devices/DeviceSettings";

function parseDevice<T extends Record<string, any>>(
  nodeId: string & keyof T,
  deviceTree: T,
  roleTree: BranchNodeType,
  controller: MoteControllerType
): DeviceType {
  const {
    type=DeviceCategory.UNKNOWN, name: title=nodeId, mac="unknown", hostname="unknown", connected="0",
  } = deviceTree[nodeId];
  const topic = joinPaths("device", nodeId);
  const rolesTopic = joinPaths(topic, "role");
  const rolesObj = (roleTree?.[nodeId]?? {}) as BranchNodeType;
  const roles = rolesObj? Object.keys(rolesObj).reduce((roles, key) => {
    if(rolesObj[key] === "1") {
      roles.push(key);
    }
    return roles;
  }, [] as string[]): [];
  const powerCommandTopic = joinPaths(rolesTopic, "power/command");
  const makePowerCommand = (commandName: string) => {
    const commandTopic = joinPaths(powerCommandTopic, commandName);
    return (args?: string) => controller.command(commandTopic, args);
  };
  const wakeTopic = joinPaths(topic, "wake_requested");
  const {icon} = deviceCategoryInfo[type as DeviceCategory]?? deviceCategoryInfo.unknown;
  return {
    nodeId,
    title,
    icon,
    type,
    mac,
    hostname,
    topic,
    rolesTopic,
    isConnected: connected === "1",
    roles,
    wake: () => controller.spray(wakeTopic),
    off: makePowerCommand("off"),
    reboot: makePowerCommand("reboot"),
    sleep: makePowerCommand("sleep"),
    Page: DeviceSettings,
  }
}

export default function DevicesWorker() {
  const controller = useMote();
  const deviceTree = useSubscription("device/+/+");
  const roleTree = useSubscription("device/+/role/+");
  const [devices, deviceOptions] = useMemo(() => (deviceTree === null || roleTree === null)? [null, null]: (
    Object.keys(deviceTree).reduce(([devices, deviceOptions], nodeId) => {
      const parsed = parseDevice(nodeId, deviceTree, roleTree, controller);
      devices[nodeId] = parsed;
      deviceOptions.push(parsed);
      return [devices, deviceOptions];
    }, [{} as Record<string, DeviceType>, [] as DeviceType[]])
  ), [deviceTree, roleTree, controller]);
  useStorer(deviceTreeKey, deviceTree);
  useStorer(roleTreeKey, roleTree);
  useStorer(devicesKey, devices);
  useStorer(deviceOptionsKey, deviceOptions);
  return null;
}