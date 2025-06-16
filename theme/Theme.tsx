import {ReactNode, useMemo} from "react";
import type ThemeType from "./types/ThemeType";
import useTheme from "./useTheme";
import ThemeContext from "./ThemeContext";

export default function Theme({children, ...props}: Partial<ThemeType> & {children: ReactNode}) {
  const theme = useTheme();
  const childTheme = useMemo(() => ({...theme, ...props}), []);
  return <ThemeContext.Provider value={childTheme} children={children}/>
}
