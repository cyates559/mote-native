import StoreContext from "./StoreContext";
import {ReactNode, useCallback, useMemo, useRef} from "react";
import StoreType from "@/features/store/types/StoreType";
import StoreCallbackMapType from "@/features/store/types/StoreCallbackMapType";
import StoreCallbackType from "@/features/store/types/StoreCallbackType";
import StoreControllerType from "@/features/store/types/StoreControllerType";

export default function StoreProvider({children}: {children: ReactNode}) {
  const storeRef = useRef<{store: StoreType, callbacks: StoreCallbackMapType}>({store: {}, callbacks: {}});
  const setState = useCallback((key: string, value: any) => {
    const {store, callbacks} = storeRef.current;
    store[key] = value;
    for(const callback of callbacks[key]?? []) {
      callback(value);
    }
  }, []);
  const props: StoreControllerType = useMemo(() => ({
    ...storeRef.current, setState,
    updateState: (update: StoreType) => Object.keys(update).forEach(key => setState(key, update[key])),
    addCallback: (key: string, callback: StoreCallbackType) => {
      const {callbacks} = storeRef.current;
      if(callbacks.hasOwnProperty(key)) {
        callbacks[key].push(callback);
      } else {
        callbacks[key] = [callback];
      }
    },
    removeCallback: (key: string, callback: StoreCallbackType) => {
      const {callbacks} = storeRef.current;
      const index = callbacks[key].indexOf(callback);
      callbacks[key].splice(index, 1);
    },
  }), []);
  return (
    <StoreContext.Provider value={props}>
      {children}
    </StoreContext.Provider>
  );
}