import {ReactNode} from "react";
import Themer from "./Themer";

export default function NavTheme(props: {children?: ReactNode}) {
  return <Themer color="navColor" backgroundColor="navBackgroundColor" {...props}/>
}