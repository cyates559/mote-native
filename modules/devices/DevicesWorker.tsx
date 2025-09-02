import {useMemo} from "react";
import {useStorer, useMote, useSubscription, BranchNodeType, MoteControllerType, joinPaths, Storer,} from "@/core";
import DeviceType from "./types/DeviceType";
import deviceCategoryInfo from "./deviceCategoryInfo";
import DeviceCategory from "./types/DeviceCategory";
import DeviceSettings from "./DeviceSettings";
import {deviceOptionsKey, devicesKey, rolesKey} from "./keys";

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
  const nameTopic = joinPaths(topic, "name");
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
    wake: type === "node"? () => controller.spray(wakeTopic): undefined,
    off: roles.includes("power")? makePowerCommand("off"): undefined,
    reboot: roles.includes("power")? makePowerCommand("reboot"): undefined,
    sleep: roles.includes("power")? makePowerCommand("sleep"): undefined,
    upgrade: roles.includes("power")? makePowerCommand("upgrade"): undefined,
    stopService: roles.includes("power")? makePowerCommand("exit"): undefined,
    restartService: roles.includes("power")? makePowerCommand("restart_service"): undefined,
    Page: DeviceSettings,
    rename: (newName) => {
      if (newName !== null && newName.length > 0) {
        controller.retain(nameTopic, newName);
      }
    },
    delete: () => controller.retain(joinPaths(topic, "#"), ""),
    setRoleEnabled: (roleId: string, enabled: boolean) => {
      if(enabled) {
        controller.retain(joinPaths(rolesTopic, roleId), "1");
      } else {
        controller.retain(joinPaths(rolesTopic, roleId, ""), "");
        controller.retain(joinPaths(rolesTopic, roleId, "#"), "");
      }
    },
  }
}

export default function DevicesWorker() {
  const controller = useMote();
  const deviceTree = useSubscription("device/+/+");
  const roleTree = useSubscription("device/+/role/+");
  const roles = useSubscription("role/+/+");
  const [devices, deviceOptions] = useMemo(() => (deviceTree === null || roleTree === null)? [null, null]: (
    Object.keys(deviceTree).reduce(([devices, deviceOptions], nodeId) => {
      const parsed = parseDevice(nodeId, deviceTree, roleTree, controller);
      devices[nodeId] = parsed;
      deviceOptions.push(parsed);
      return [devices, deviceOptions];
    }, [{} as Record<string, DeviceType>, [] as DeviceType[]])
  ), [deviceTree, roleTree, controller]);
  return <Storer {...{
    [rolesKey]: roles,
    [devicesKey]: devices,
    [deviceOptionsKey]: deviceOptions,
  }}/>
}