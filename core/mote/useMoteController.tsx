import {useEffect, useMemo, useRef, useState} from "react";
import MoteStateType from "@/core/mote/types/MoteStateType";
import defaultState from "@/core/mote/defaultState";
import handleStateChange from "@/core/mote/handleStateChange";
import createController from "@/core/mote/createController";
import {MoteControllerType, ConnectionState} from "./types";
import {useRouteInfo} from "expo-router/build/hooks";

export default function useMoteController(): MoteControllerType {
  const [state, setState] = useState<MoteStateType>({...defaultState, ...useRouteInfo().pathname.startsWith("/app")? {}: {connectionState: ConnectionState.DISCONNECTED}});
  const stateRef = useRef<MoteStateType>(state);
  const controller = useMemo(() => createController(stateRef, setState), []);
  useEffect(() => {
    stateRef.current = state;
    handleStateChange(state, setState);
  }, [state]);
  return {...controller, state: state.connectionState, error: state.error};
}