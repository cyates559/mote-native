import {Href, useGlobalSearchParams, useLocalSearchParams} from "expo-router";
import RouterType from "@/features/ModuleLayout/types/RouterType";
import useStores from "@/features/store/useStores";
import {ComponentType, useMemo} from "react";
import ModulePropsType from "@/features/ModuleLayout/types/ModulePropsType";
import RouteType, {
  BreadcrumbsType,
  DynamicRouteType, RouteOptionsListType,
  RouteOptionsType,
  StaticRouteType
} from "@/features/ModuleLayout/types/RouteType";
import StoreType from "@/features/store/types/StoreType";
import joinPaths from "@/utils/joinPaths";
import DefaultIndex from "@/features/ModuleLayout/DefaultIndex";
import Home from "@/features/ModuleLayout/Home";
import {IconNameType} from "@/components";

export type FastTreeType = Record<string, FastTreeRouteType>;

export type FastTreeRouteType = RouteType & {
  childTree: FastTreeType;
}

export type FastTreeDynamicRouteType = FastTreeRouteType & DynamicRouteType;

export function getComposerTree(composer: RouteType[]) {
  return composer.reduce((result, route) => {
    const {nodeId, children} = route;
    result[nodeId] = {...route, childTree: getComposerTree(children?? [])};
    return result;
  }, {} as FastTreeType);
}

function getKeys(route: string[], results: string[], tree: FastTreeType) {
  const nodeId = route[0];
  if(tree) {
    let nextChildTree = tree;
    if(tree.hasOwnProperty("+")) {
      const {storeKey, childTree} = tree["+"] as FastTreeDynamicRouteType;
      nextChildTree = childTree;
      results.push(storeKey);
    } else if(tree.hasOwnProperty("#")) {
      const {storeKey, childTree} = tree["#"] as FastTreeDynamicRouteType;
      nextChildTree = childTree;
      results.push(storeKey);
    }
    if(tree.hasOwnProperty(nodeId)) {
      const {childTree} = tree[nodeId];
      nextChildTree = childTree;
    }
    if(route.length > 0) {
      const next = route.slice(1);
      return getKeys(next, results, nextChildTree);
    }
  }
  return results;
}

function compileOptions(href: Href, composer: RouteType[] | undefined, dynamicOptions: StoreType, depth: number) {
  const options: RouteOptionsType = [];
  if(composer) for(const child of composer) {
    const {nodeId} = child;
    if(nodeId === "+") {
      const {storeKey, loadingText="Loading..."} = child as DynamicRouteType;
      const unpacked = dynamicOptions[storeKey] as StaticRouteType[];
      if(unpacked) {
        options.push(...unpacked.map(option => {
          return {...option, href: option.href?? joinPaths(href as string, option.nodeId) as Href};
        }));
      } else {
        options.push(loadingText);
      }
    } else if (nodeId === "#") {
      const {storeKey} = child as DynamicRouteType;
      const subTrail = dynamicOptions[storeKey];
      if(subTrail && subTrail.length > depth && subTrail[depth]) {
        options.push(...subTrail[depth])
      } else {
        options.push("Loading...");
      }
    } else {
      options.push({...child as StaticRouteType, href: child.href?? joinPaths(href as string, nodeId) as Href});
    }
  }
  return options;
}

export function compileAllRouteOptions(
    baseHref: Href,
    route: string[],
    composerTreeIndex: FastTreeRouteType,
    composer: RouteType[],
    dynamicOptions: StoreType,
) {
  let depth = 0;
  let treeCursor: FastTreeRouteType = composerTreeIndex;
  let href = baseHref;
  const routeOptions = [compileOptions(baseHref, composer, dynamicOptions, depth)];
  let remaining = route.slice(1);
  let doubleWhammy = false;
  while(remaining.length > 0) {
    const nextId = remaining[0];
    href = joinPaths(href as string, nextId) as Href;
    if(doubleWhammy) {
      depth++;
    } else if(treeCursor.childTree.hasOwnProperty(nextId)) {
      treeCursor = treeCursor.childTree[nextId];
    } else if(treeCursor.childTree.hasOwnProperty("+")) {
      treeCursor = treeCursor.childTree["+"];
    } else if(treeCursor.childTree.hasOwnProperty("#")) {
      depth++;
      doubleWhammy = true;
    } else {
      // NotFound
      return routeOptions;
    }
    routeOptions.push(compileOptions(href, treeCursor.children, dynamicOptions, depth));
    remaining = remaining.slice(1);
  }
  return routeOptions;
}

export function getBreadcrumbs(baseHref: Href, route: string[], routeOptions: RouteOptionsListType): [BreadcrumbsType, ComponentType] {
  let href: Href = baseHref;
  if(route.length < 2) {
    return [[], Home]
  }
  const crumbs = route.slice(1).map((nodeId, i) => {
    href = joinPaths(href as string, nodeId) as Href;
    const currentRoute = routeOptions[i]?.find(option => typeof option !== "string" && option.nodeId === nodeId) as StaticRouteType | undefined;
    const title = currentRoute?.title?? "?";
    const Page = currentRoute == null? NotFound: currentRoute.Page?? DefaultIndex;
    return {href, title, Page};
  });
  return [crumbs, crumbs[crumbs.length - 1].Page];
}

export function NotFound() {
  return "not found"
}

const rootProps = {nodeId: "", Page: DefaultIndex, icon: "Home" as IconNameType, title: "Mote"};

export default function useRouterController(props: ModulePropsType): RouterType {
  const {composer, baseHref} = props;
  const {route: rawRoute} = useLocalSearchParams();
  const route = useMemo(() => Array.isArray(rawRoute)? ["/", ...rawRoute]: rawRoute == null? ["/"]: ["/", rawRoute], [rawRoute]);
  console.log("RT", route, useLocalSearchParams())
  const composerTree = useMemo(() => getComposerTree(composer), [composer]);
  const selectedKeys = useMemo(() => getKeys(route, [], composerTree), [route, composerTree]);
  const dynamicOptions = useStores(selectedKeys);
  const composerTreeIndex: FastTreeRouteType = useMemo(() => ({
    ...rootProps, children: composer, childTree: composerTree
  }), [composerTree, composer]);
  const routeOptions = useMemo(() => compileAllRouteOptions(
    baseHref, route, composerTreeIndex, composer, dynamicOptions
  ), [route, dynamicOptions, composerTreeIndex, composer]);
  const [breadcrumbs, Page] = useMemo(() => getBreadcrumbs(baseHref, route, routeOptions), [routeOptions, route, baseHref]);
  const currentOptions: RouteOptionsType = useMemo(() => routeOptions[route.length - 1], [route, routeOptions]);
  return {route, routeOptions, breadcrumbs, Page, currentOptions};
}
