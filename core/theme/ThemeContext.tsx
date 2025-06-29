import {createContext} from "react";
import type ThemeType from "./types/ThemeType";
import defaultTheme from "./defaultTheme";

const ThemeContext = createContext<ThemeType>(defaultTheme);

export default ThemeContext;
