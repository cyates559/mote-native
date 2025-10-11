import {useCallback, useContext, useState} from "react";
import {PublisherStateType, GenericPublisherType} from "./types";
import MoteContext from "@/core/layouts/MoteLayout/MoteContext";

export default function usePublisher<T>(call: GenericPublisherType<T>) {
  const [state, setState] = useState<PublisherStateType<T>>({});
  const send = useCallback((topic: string, message: T) => {
    setState(prev => ({...prev, topic, message, response: null}));
    call(topic, message).then(response => setState(prev => ({...prev, response})));
  }, [call]);
  return {send, response: state}
}


export function useRetain() { return usePublisher(useContext(MoteContext).retain); }

export function useCommand() { return usePublisher(useContext(MoteContext).command); }

export function useSpray() { return usePublisher(useContext(MoteContext).spray); }

export function useRetainTree() { return usePublisher(useContext(MoteContext).retainTree); }