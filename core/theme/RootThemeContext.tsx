import {createContext} from "react";
import type ThemeType from "./types/ThemeType";
import defaultTheme from "./defaultTheme";

const RootThemeContext = createContext<ThemeType>(defaultTheme);

export default RootThemeContext;
