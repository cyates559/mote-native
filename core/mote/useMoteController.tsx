import {useEffect, useMemo, useRef, useState} from "react";
import MoteStateType from "@/core/mote/types/MoteStateType";
import defaultState from "@/core/mote/defaultState";
import handleStateChange from "@/core/mote/handleStateChange";
import createController from "@/core/mote/createController";
import MoteControllerType from "./types/MoteControllerType";

export default function useMoteController(): MoteControllerType {
  const [state, setState] = useState<MoteStateType>(defaultState);
  const stateRef = useRef<MoteStateType>(state);
  const controller = useMemo(() => createController(stateRef, setState), []);
  useEffect(() => {
    stateRef.current = state;
    handleStateChange(state, setState);
  }, [state]);
  return {...controller, state: state.connectionState, error: state.error};
}