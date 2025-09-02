import ThemeNamePropsType from "./types/ThemeNamePropsType";
import * as themes from "./themes";


export default function SubTheme({theme, ...props}: ThemeNamePropsType) {
  const ThemeComponent = themes[theme];
  return <ThemeComponent {...props}/>
}
