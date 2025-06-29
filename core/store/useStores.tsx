import {useState, useContext, useEffect, useRef, useMemo} from "react";
import StoreContext from "./StoreContext";
import StoreKeyType from "@/core/store/types/StoreKeyType";
import StoreDataType from "@/core/store/types/StoreDataType";
import StoreType from "@/core/store/types/StoreType";
import StoreCallbackType from "@/core/store/types/StoreCallbackType";



export default function useStores(keys: StoreKeyType[]) {
  const {addCallback, removeCallback, store} = useContext(StoreContext);
  const [states, setStates] = useState<StoreDataType[]>([]);
  const prevState = useRef<{savedKeys: StoreKeyType[], removers: (() => void)[], init: boolean}>(
    {savedKeys: [], removers: [], init: false}
  );
  useEffect(() => {
    const {savedKeys, removers, init} = prevState.current;
    const sl = savedKeys.length;
    const nl = keys.length;
    const l = Math.max(sl, nl);
    const newRemovers = [...removers];
    const removals: (() => void)[] = [];
    const keysToAdd: StoreKeyType[] = [];
    const newIndexes: number[] = [];
    const callbacksToAdd: StoreCallbackType[] = [];
    const loop = (i: number) => {
      const oldKey = savedKeys[i] ?? null;
      const newKey = keys[i] ?? null;
      if(oldKey !== newKey) {
        if(newKey) {
          const callback = (newValue: StoreDataType) => setStates(values => {
            const newValues = [...values];
            // newValues[i] = parse(newValue);
            newValues[i] = newValue;
            return newValues;
          });
          keysToAdd.push(newKey);
          callbacksToAdd.push(callback);
          newIndexes.push(i);
        } else {
          newRemovers.pop();
          setStates(values => {
            const newValues = [...values];
            newValues.pop();
            return newValues;
          });
        }
        if(oldKey) {
          removals.push(removers[i]);
        }
      }
    };
    for(let i = 0; i < l; i++) { loop(i); }
    const valuesToSet: [number, StoreDataType][] = [];
    keysToAdd.forEach((key, j) => {
      const callback = callbacksToAdd[j];
      addCallback(key, callback);
      const remover = () => removeCallback(key, callback);
      const value = store[keysToAdd[j]];
      const i = newIndexes[j];
      newRemovers[i] = remover;
      if(init) {
        valuesToSet.push([i, value]);
      }
    });
    if(valuesToSet.length > 0) {
      setStates(values => {
        const newValues = [...values];
        for(const [i, value] of valuesToSet) {
          newValues[i] = value;
        }
        return newValues;
      });
    }
    for(const remove of removals) { remove(); }
    prevState.current = {savedKeys: keys, removers: newRemovers, init: true};
  }, [keys, prevState, setStates, store, addCallback, removeCallback]);

  // onDestroy
  useEffect(() => () => {
    prevState.current.removers.forEach(remove => remove());
    prevState.current = {savedKeys: [], removers: [], init: false};
  }, [prevState]);
  return useMemo(() => keys.reduce((results, key) => {
    results[key] = store[key];
    return results;
  }, {} as StoreType), [keys, states, store]);
}
