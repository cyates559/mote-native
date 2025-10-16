import {BaseModule, ModulePropsType} from "@/core";
import DenonWorker from "./DenonWorker";
import DenonAVRDeviceFigureButtonLink from "@/modules/denon/DenonAVRDeviceFigureButtonLink";
import {denonOptionsKey} from "@/modules/denon/keys";
import EditDenonAVRDevice from "@/modules/denon/EditDenonAVRDevice";
import AddDenonAVRDevice from "@/modules/denon/AddDenonAVRDevice";
import DenonAVRDevice from "@/modules/denon/DenonAVRDevice";

export class DenonModule extends BaseModule {
  init({workers, composer, settingsComposer}: ModulePropsType) {
    workers.push(DenonWorker);
    composer.push(
      {nodeId: "denon_avr", title: "Denon", icon: "Speaker", props: {ButtonClass: DenonAVRDeviceFigureButtonLink}, children: [
        {nodeId: "+", storeKey: denonOptionsKey, loadingText: "Loading AVR Devices...", Page: DenonAVRDevice},
      ]},
    );
    settingsComposer.push(
      {nodeId: "denon_avr", title: "Denon AVR", icon: "Speaker", children: [
        {nodeId: "+", storeKey: denonOptionsKey, loadingText: "Loading AVR Devices...", Page: EditDenonAVRDevice},
        {nodeId: "+add_avr_device", title: "New AVR Device", icon: "Plus", Page: AddDenonAVRDevice},
      ]},
    );
  }
}