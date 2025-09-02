import {Href} from "expo-router";
import HrefModeType from "./HrefModeType";

export default interface HrefPropsType {
  href: Href;
  hrefMode?: HrefModeType;
}
