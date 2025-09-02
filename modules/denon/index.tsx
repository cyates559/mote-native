import {BaseModule, ModulePropsType} from "@/core";
import DenonWorker from "./DenonWorker";
import DenonAVRDeviceFigureButtonLink from "@/modules/denon/DenonAVRDeviceFigureButtonLink";
import {denonOptionsKey} from "@/modules/denon/keys";

export class DenonModule extends BaseModule {
  init({workers, composer, settingsComposer}: ModulePropsType) {
    workers.push(DenonWorker);
    composer.push(
      {nodeId: "denon", title: "Denon", icon: "Speaker", props: {ButtonClass: DenonAVRDeviceFigureButtonLink}, children: [
        {nodeId: "+", storeKey: denonOptionsKey, loadingText: "Loading AVR Devices..."},
      ]},
    );
    // settingsComposer.push(
    //   {nodeId: "roku", title: "Roku", icon: "Tv", children: [
    //     {nodeId: "+", storeKey: rokuOptionsKey, loadingText: "Loading Roku Devices...", Page: RokuDeviceSettings},
    //     {nodeId: "+add_roku", title: "New Roku", icon: "Plus", Page: AddRokuDevice},
    //   ]},
    // );
  }
}