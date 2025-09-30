import {useMemo} from "react";
import {router} from "expo-router";
import {HrefPropsType} from "./types";

export default function useHrefOnPress({href, hrefMode}: HrefPropsType) {
  return useMemo(() => {
    switch (hrefMode) {
      default:
      case "navigate":
        return () => router.navigate(href);
      case "push":
        return () => router.push(href);
      case "replace":
        return () => router.replace(href);
    }
  }, [href, hrefMode]);
}