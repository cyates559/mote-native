import {ReactNode} from "react";
import Themer from "../Themer";

export default function NavTheme(props: {children?: ReactNode}) {
  return <Themer buttonColor="navColor" backgroundColor="navBackgroundColor" {...props}/>
}