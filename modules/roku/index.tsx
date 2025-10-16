import {BaseModule, ModulePropsType} from "@/core";
import RokuWorker from "./RokuWorker";
import { rokuOptionsKey } from "./keys";
import RokuFigureButtonLink from "@/modules/roku/RokuFigureButtonLink";
import AddRokuDevice from "@/modules/roku/AddRokuDevice";
import EditRokuDevice from "@/modules/roku/EditRokuDevice";
import RokuDevice from "@/modules/roku/RokuDevice";

export class RokuModule extends BaseModule {
  init({workers, composer, settingsComposer}: ModulePropsType) {
    workers.push(RokuWorker);
    composer.push(
      {nodeId: "roku", title: "Roku", icon: "Tv", props: {ButtonClass: RokuFigureButtonLink}, children: [
        {nodeId: "+", storeKey: rokuOptionsKey, loadingText: "Loading Roku Devices...", Page: RokuDevice},
      ]},
    );
    settingsComposer.push(
      {nodeId: "roku", title: "Roku", icon: "Tv", children: [
        {nodeId: "+", storeKey: rokuOptionsKey, loadingText: "Loading Roku Devices...", Page: EditRokuDevice},
        {nodeId: "+add_roku_device", title: "New Roku Device", icon: "Plus", Page: AddRokuDevice},
      ]},
    );
  }
}