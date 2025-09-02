import {ReactNode, useContext} from "react";
import ThemeFlagsType from "@/core/theme/types/ThemeFlagsType";
import RootThemeContext from "@/core/theme/RootThemeContext";
import ThemeKeyType from "./types/ThemeKeyType";
import ThemeType from "./types/ThemeType";
import Theme from "./Theme";

export default function createTheme(name: string, theme: Partial<Record<ThemeKeyType, null | ThemeKeyType>>) {
  function ThemeInstance(props: {children?: ReactNode} & ThemeFlagsType) {
    const root = useContext(RootThemeContext);
    const newTheme = (Object.keys(theme) as ThemeKeyType[]).reduce((results, key: ThemeKeyType) => {
      // @ts-ignore
      results[key] = root[theme[key]];
      return results;
    }, {} as Partial<ThemeType>);
    return <Theme {...newTheme} {...props}/>;
  }
  ThemeInstance.displayName = name + "Theme";
  return ThemeInstance;
}