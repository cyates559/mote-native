import {ReactNode} from "react";
import Themer from "../Themer";

export default function SidebarTheme(props: {children?: ReactNode}) {
  return <Themer buttonColor="sidebarColor" backgroundColor="sidebarBackgroundColor" {...props}/>
}