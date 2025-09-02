import {useContext, useEffect, useRef, useState} from "react";
import NodeType from "./types/NodeType";
import {BranchNodeType} from "@/core";
import MoteContext from "@/core/layouts/MoteLayout/MoteContext";

export default function useSubscriptions<T extends NodeType=BranchNodeType>(topics: string[]) {
  const {addSubscriptions} = useContext(MoteContext);
  const [values, setValues] = useState<T[]>([]);
  const savedTopics = useRef<string[]>([]);
  const removers = useRef<(() => void)[]>([]);
  const init = useRef<boolean>(false);
  useEffect(() => {
    const sl = savedTopics.current.length;
    const nl = topics.length;
    const l = Math.max(sl, nl);
    const newRemovers = [...removers.current];
    const removals: (() => void)[] = [];
    const topicsToAdd: string[] = [];
    const newIndexes: number[] = [];
    const callbacksToAdd: ((data: T) => void)[] = [];
    const loop = (i: number) => {
      const oldTopic = savedTopics.current[i] ?? null;
      const newTopic = topics[i] ?? null;
      if(oldTopic !== newTopic) {
        if(newTopic) {
          const callback = (newValue: T) => setValues(values => {
            const newValues = [...values];
            newValues[i] = newValue;
            return newValues;
          });
          topicsToAdd.push(newTopic);
          callbacksToAdd.push(callback);
          newIndexes.push(i);
        } else {
          newRemovers.pop();
          setValues(values => {
            const newValues = [...values];
            newValues.pop();
            return newValues;
          });
        }
        if(oldTopic) {
          removals.push(removers.current[i]);
        }
      }
    };
    for(let i = 0; i < l; i++) { loop(i); }
    const qos = 1;
    const results = addSubscriptions(topicsToAdd, callbacksToAdd, qos);
    const valuesToSet: [number, T][] = [];
    for(let j = 0; j < topicsToAdd.length; j++) {
      const [remover, value] = results[j];
      const i = newIndexes[j];
      newRemovers[i] = remover;
      if(init) {
        valuesToSet.push([i, value as T]);
        // callbacksToAdd[j](value);
      }
    }
    if(valuesToSet.length > 0) {
      setValues(values => {
        const newValues = [...values];
        for(const [i, value] of valuesToSet) {
          newValues[i] = value;
        }
        return newValues;
      });
    }
    for(const remove of removals) { remove(); }
    savedTopics.current = topics;
    removers.current = newRemovers;
    init.current = true;
  }, [topics, setValues, addSubscriptions]);

  // onDestroy
  useEffect(() => () => {
    removers.current.forEach(remove => remove());
    removers.current = [];
    init.current = false;
    savedTopics.current = [];
  }, []);
  return values;
}