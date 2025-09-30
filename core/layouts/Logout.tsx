import {useEffect} from "react";
import {Loading} from "@/core/components";
import {useMote} from "@/core/mote";

export default function Logout() {
  const mote = useMote();
  useEffect(mote.disconnect);
  return <Loading header="Logging out..."/>
}