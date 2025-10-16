import {useCallback, useContext, useState} from "react";
import {PublisherStateType, GenericPublisherType} from "./types";
import MoteContext from "@/core/layouts/MoteLayout/MoteContext";


export type GenericPublishType<T=string | null | undefined> =
  (topic: string, message: T) => void;

export interface PublisherControllerType<T> extends PublisherStateType<T> {
  send: GenericPublishType<T>;
}

export default function usePublisher<T>(call: GenericPublisherType<T>): PublisherControllerType<T> {
  const [state, setState] = useState<PublisherStateType<T>>({});
  const send = useCallback((topic: string, message: T) => {
    setState({topic, message, response: null});
    if(!topic) {
      return;
    }
    call(topic, message).then(response => setState(prev => ({...prev, response})));
  }, [call]);
  return {send, ...state};
}


export function useRetain() { return usePublisher(useContext(MoteContext).retain); }

export function useCommand() { return usePublisher(useContext(MoteContext).command); }

export function useSpray() { return usePublisher(useContext(MoteContext).spray); }

export function useRetainTree() { return usePublisher(useContext(MoteContext).retainTree); }