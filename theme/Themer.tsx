import {ReactNode} from "react";
import Theme from "./Theme";
import useTheme from "./useTheme";
import ThemeKeyType from "./types/ThemeKeyType";
import ThemeType from "./types/ThemeType";

export default function Themer(props: {children?: ReactNode} & Partial<Record<ThemeKeyType, ThemeKeyType>>) {
  const theme = useTheme();
  const {children, ...themer} = props;
  const newTheme = (Object.keys(themer) as ThemeKeyType[]).reduce((results, key: ThemeKeyType) => {
    // @ts-ignore
    results[key] = theme[themer[key]];
    return results;
  }, {} as Partial<ThemeType>);
  return (
    <Theme {...newTheme}>
      {children}
    </Theme>
  );
}