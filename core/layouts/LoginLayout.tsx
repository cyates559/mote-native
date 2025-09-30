import {joinPaths} from "@/core/utils";
import {useMote, ConnectionState} from "@/core/mote";
import {Redirect, Slot, useGlobalSearchParams} from "expo-router";

export default function LoginLayout() {
  const mote = useMote();
  const {route} = useGlobalSearchParams<{route: string[]}>();
  if(mote.state === ConnectionState.DISCONNECTED) {
    return <Slot/>
  } else {
    return <Redirect href={joinPaths("/app", ...(route?? [])) as any}/>
  }
}