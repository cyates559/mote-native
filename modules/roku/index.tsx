import {BaseModule, ModulePropsType} from "@/core";
import RokuWorker from "./RokuWorker";
import { rokuOptionsKey } from "./keys";
import RokuFigureButtonLink from "@/modules/roku/RokuFigureButtonLink";

export class RokuModule extends BaseModule {
  init({workers, composer, settingsComposer}: ModulePropsType) {
    workers.push(RokuWorker);
    composer.push(
      {nodeId: "roku", title: "Roku", icon: "Tv", props: {ButtonClass: RokuFigureButtonLink}, children: [
        {nodeId: "+", storeKey: rokuOptionsKey, loadingText: "Loading Roku Devices..."},
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