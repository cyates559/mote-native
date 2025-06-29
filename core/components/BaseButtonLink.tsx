import {Href} from "expo-router";
import BaseButton, {BaseButtonPropsType} from "@/core/components/BaseButton";
import useHrefOnPress from "@/core/components/useHrefOnPress";

export type HrefModeType = "navigate" | "push" | "replace";

export interface HrefPropsType {
  href: Href;
  hrefMode?: HrefModeType;
}

export type BaseButtonLinkPropsType = BaseButtonPropsType & HrefPropsType;

export default function BaseButtonLink({href, hrefMode, ...props}: BaseButtonLinkPropsType) {
  return <BaseButton onPress={useHrefOnPress({href, hrefMode})} {...props}/>
}

BaseButtonLink.rejectRef = true;
;