import ThemeFlagsType from "@/core/theme/types/ThemeFlagsType";
import * as themes from "@/core/theme/themes";
import {ReactNode} from "react";

export default interface ThemeNamePropsType extends ThemeFlagsType {
  theme: keyof typeof themes,
  children?: ReactNode;
}