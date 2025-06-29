import type ThemeType from "./ThemeType";

type ThemablePropsType<PropsType> = {
  [PropsKey in keyof PropsType]: PropsType[PropsKey] | ((theme: ThemeType) => PropsType[PropsKey]);
}

export default ThemablePropsType;
