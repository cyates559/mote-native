import {useState, useContext, useEffect} from "react";
import StoreContext from "./StoreContext";
import StoreKeyType from "@/features/store/types/StoreKeyType";
import StoreDataType from "@/features/store/types/StoreDataType";

export default function useStore(key: StoreKeyType, defaultValue: StoreDataType=null) {
  const {addCallback, removeCallback, store} = useContext(StoreContext);
  const [state, setState] = useState(store[key]);
  useEffect(() => {
    addCallback(key, setState);
    if(state !== store[key]) {
      setState(store[key]);
    }
    return () => removeCallback(key, setState);
  }, [key, state]);
  return state?? defaultValue;
}
