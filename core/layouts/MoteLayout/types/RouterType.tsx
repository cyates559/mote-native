import {BreadcrumbsType, RouteOptionsListType, RouteOptionsType} from "@/core/layouts/MoteLayout/types/RouteType";
import {ComponentType} from "react";
import {Href} from "expo-router";

export default interface RouterType {
  route: string[];
  routeOptions: RouteOptionsListType;
  breadcrumbs: BreadcrumbsType;
  nodeId: string;
  title: string;
  href: Href;
  Page: ComponentType;
  pageProps?: Record<string, any>;
  currentOptions: RouteOptionsType;
  back: () => void;
  dismiss: () => void;
}
