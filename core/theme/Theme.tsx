import {StyleSheet} from "react-native";
import {ReactNode, useContext, useMemo} from "react";
import ThemeFlagsType from "./types/ThemeFlagsType";
import ThemeType from "./types/ThemeType";
import useTheme from "./useTheme";
import ThemeContext from "./ThemeContext";
import RootThemeContext from "./RootThemeContext";

export type ThemePropsType = Partial<ThemeType> & {children?: ReactNode} & ThemeFlagsType;

export default function Theme(props: ThemePropsType) {
  const {children, secondary=false, selected=false, hovered=false, pressed=false, ...rest} = props;
  const root = useContext(RootThemeContext);
  const theme = useTheme();
  const childTheme = useMemo(() => {
    const t = {...theme, ...rest};
    if(secondary) {
      t.color = root.secondaryColor;
    } else if(pressed) {
      t.color = root.pressedColor;
      t.backgroundColor = root.pressedBackgroundColor;
      t.style = StyleSheet.flatten([t.style, root.pressedStyle]);
    } else if(hovered) {
      t.color = root.hoverColor;
      t.backgroundColor = root.hoverBackgroundColor;
      t.style = StyleSheet.flatten([t.style, root.hoverStyle]);
    } else if(selected) {
      t.color = root.selectedColor;
      t.backgroundColor = root.selectedBackgroundColor;
      t.style = StyleSheet.flatten([t.style, root.selectedStyle]);
    }
    return t;
  }, [secondary, selected, hovered, pressed, theme, rest, root]);
  return <ThemeContext.Provider value={childTheme} children={children}/>
}
