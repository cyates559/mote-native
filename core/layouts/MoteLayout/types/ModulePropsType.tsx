import RouteType from "@/core/layouts/MoteLayout/types/RouteType";
import {ComponentType} from "react";
import {Href} from "expo-router";

export default interface ModulePropsType {
  baseHref: Href;
  workers: ComponentType[];
  composer: RouteType[];
  settingsComposer: RouteType[];
}