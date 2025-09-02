import {IconNameType, HrefModeType} from "@/core/components";
import {Href} from "expo-router";
import {ComponentType} from "react";
import { DefaultIndexPropsType } from "../DefaultIndex";

export type BaseRouteType<P=DefaultIndexPropsType> = {
  nodeId: string;
  Page?: ComponentType;
  props?: P;
  children?: RouteType[];
  href?: Href;
  hrefMode?: HrefModeType;
}

export type StaticRouteType = BaseRouteType & {
  icon: IconNameType;
  title: string;
}

export type RouteOptionType = StaticRouteType & {
  href: Href;
};

export type RouteOptionsType = (RouteOptionType | string)[];

export type RouteOptionsListType = RouteOptionsType[];

export type BreadcrumbType = {
  href: Href;
  title: string;
  Page: ComponentType;
  pageProps?: Record<string, any>;
  nodeId: string;
}

export type BreadcrumbsType = BreadcrumbType[];

export type DynamicRouteType = BaseRouteType & {
  nodeId: "+" | "#";
  storeKey: string;
  loadingText?: string;
}

type RouteType = StaticRouteType | DynamicRouteType;
export default RouteType;
