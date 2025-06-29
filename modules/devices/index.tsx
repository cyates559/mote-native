import ModulePropsType from "@/core/layouts/MoteLayout/types/ModulePropsType";
import BaseModule from "@/core/layouts/MoteLayout/BaseModule";
import {deviceOptionsKey} from "@/modules/devices/keys";
import DevicesWorker from "@/modules/devices/DevicesWorker";

export class DevicesModule extends BaseModule {
  init({workers, settingsComposer}: ModulePropsType) {
  workers.push(DevicesWorker);
  settingsComposer.push({nodeId: "devices", icon: "Cpu", title: "Devices", children: [
    {nodeId: "+", storeKey: deviceOptionsKey, loadingText: "Loading Devices..."},
  ]});
  }
}
