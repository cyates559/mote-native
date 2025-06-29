import useModuleRouter from "@/core/layouts/MoteLayout/useModuleRouter";
import { devicesKey } from "./keys";
import {T, useStore} from "@/core";

export default function DeviceSettings() {
  const r = useModuleRouter();
  const devices = useStore(devicesKey);
  return <T>{JSON.stringify(r.nodeId, null, 2)}</T>
  // const {command, retain, spray} = useMote();
  // const [showRoles, setShowRoles] = useState(false);
  // const rolesObj = useSubscription(joinPaths("device", deviceId, "role/+"));
  // if([devices, rolesObj].includes(null)) {
  //   return (
  //     <LoadingView>
  //       Loading Device...
  //     </LoadingView>
  //   );
  // }
  // const wakeEventTopic = joinPaths("device", deviceId, "wake_requested");
  // const wakeCommand = () => spray(wakeEventTopic);
  // const baseTopic = joinPaths("device", deviceId);
  // const nameTopic = joinPaths(baseTopic, "name");
  // const roleTopic = joinPaths(baseTopic, "role");
  // const onRename = () => {
  //   const newName = prompt("Device name:", title);
  //   if (newName !== null && newName.length > 0) {
  //     retain(nameTopic, newName);
  //   }
  //
  // };
  // const onDelete = () => {
  //   if (window.confirm("Are you sure you want to delete this device?")) {
  //     const d = joinPaths(baseTopic, "#");
  //     setTimeout(() => {
  //       retain(d, "");
  //     }, 0);
  //     deselect();
  //   }
  // };
  // const selectRole = (roleId, enabled) => {
  //   if (enabled) {
  //     retain(joinPaths(roleTopic, roleId), "1");
  //   } else {
  //     retain(joinPaths(roleTopic, roleId), "");
  //     retain(joinPaths(roleTopic, roleId, "#"), "");
  //   }
  // };
  // const closeRoles = () => setShowRoles(false);
  // const powerCommand = commandName => command(joinPaths(roleTopic, "power", "command", commandName));
  // const {isConnected, hostname, mac, typeName, svg} = devices[deviceId];
  // const roles = rolesObj && Object.keys(rolesObj);
  // return (
  //   <ContextLayout showContext={showRoles} onClickClose={closeRoles}>
  //     <GridScrollActivity>
  //       <WithNavActions actions={<Label>[{deviceId}]</Label>}>
  //         <FigureCard disabled svg={svg}>
  //           Type: {typeName}
  //         </FigureCard>
  //         <FigureCard disabled svg={isConnected? "Network": "NetworkOff"}>
  //           {isConnected? "Connected, ": "Disconnected, "} {hostname} ({mac})
  //         </FigureCard>
  //         {isConnected?
  //           <>
  //             <FigureCard svg="MoonFilled" onClick={() => powerCommand("suspend")}>
  //               Sleep
  //             </FigureCard>
  //             <FigureCard svg="Reload" onClick={() => powerCommand("reboot")}>
  //               Reboot
  //             </FigureCard>
  //             <FigureCard svg="Refresh" onClick={() => powerCommand("update")}>
  //               Update
  //             </FigureCard>
  //             <FigureCard svg="OctagonFilled" onClick={() => powerCommand("exit")}>
  //               Stop Service
  //             </FigureCard>
  //             <FigureCard svg="Rotate" onClick={() => powerCommand("restart_service")}>
  //               Restart Service
  //             </FigureCard>
  //             <FigureCard svg="Power" onClick={() => powerCommand("off")}>
  //               Power off
  //             </FigureCard>
  //           </>:
  //           <FigureCard svg="Broadcast" onClick={wakeCommand}>
  //             Wake
  //           </FigureCard>
  //         }
  //       </WithNavActions>
  //       <FigureCard svg="Apps" selected={showRoles} onClick={() => setShowRoles(!showRoles)}>
  //         Edit Roles
  //       </FigureCard>
  //       <FigureCard svg="CursorText" onClick={onRename}>
  //         Rename
  //       </FigureCard>
  //       <FigureCard svg="Trash" onClick={onDelete}>
  //         Delete
  //       </FigureCard>
  //     </GridScrollActivity>
  //     {roles === null?
  //       <LoadingActivity>
  //         Loading device roles...
  //       </LoadingActivity>:
  //       <>
  //         <Toolbar>
  //           <Button svg="X" onClick={closeRoles}/>
  //           <Label>
  //             Roles
  //           </Label>
  //         </Toolbar>
  //         <ScrollActivity>
  //           <Activity>
  //             {Object.keys(roleNames).map(role => (
  //               <Checkbox key={role} checked={roles.includes(role)} onChange={value => selectRole(role, value)}>
  //                 {roleNames[role]}
  //               </Checkbox>
  //             ))}
  //           </Activity>
  //         </ScrollActivity>
  //       </>
  //     }
  //   </ContextLayout>
  // );
}