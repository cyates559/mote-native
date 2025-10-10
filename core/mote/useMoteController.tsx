import {useEffect, useRef, useState} from "react";
import MoteStateType from "@/core/mote/types/MoteStateType";
import defaultState from "@/core/mote/defaultState";
import handleStateChange from "@/core/mote/handleStateChange";
import createController from "@/core/mote/createController";
import {MoteControllerType, ConnectionState} from "./types";
import {useRouteInfo} from "expo-router/build/hooks";

export default function useMoteController(): MoteControllerType {
  const {pathname} = useRouteInfo()
  const [state, setState] = useState<MoteStateType>({...defaultState, ...pathname.startsWith("/app")? {}: {connectionState: ConnectionState.DISCONNECTED}});
  const stateRef = useRef<MoteStateType>(state);
  const [controller, setController] = useState<MoteControllerType>();
  useEffect(() => {
    stateRef.current = state;
    if(!controller) {
      window.setTimeout(() => setController(createController(stateRef, setState)));
    } else {
      handleStateChange(stateRef, setState);
    }
  }, [state, controller]);
  useEffect(() => () => stateRef.current.socket?.close(), []);
  return {...controller, state: state.connectionState, error: state.error};
}