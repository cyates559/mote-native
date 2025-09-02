import {ModulePropsType, BaseModule} from "@/core";
import DebugTools from "./DebugTools";

export class DebugModule extends BaseModule {
  init({workers, settingsComposer}: ModulePropsType) {
    settingsComposer.push({nodeId: "debug", icon: "Bug", title: "Debug", Page: DebugTools});
  }
}
