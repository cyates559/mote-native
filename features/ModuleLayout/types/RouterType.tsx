import {BreadcrumbsType, RouteOptionsListType, RouteOptionsType} from "@/features/ModuleLayout/types/RouteType";
import {ComponentType} from "react";

export default interface RouterType {
  route: string[];
  routeOptions: RouteOptionsListType;
  breadcrumbs: BreadcrumbsType;
  Page: ComponentType;
  currentOptions: RouteOptionsType
}
