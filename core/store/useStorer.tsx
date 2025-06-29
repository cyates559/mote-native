import {useContext, useEffect} from "react";
import StoreContext from "./StoreContext";
import StoreKeyType from "@/core/store/types/StoreKeyType";
import StoreDataType from "@/core/store/types/StoreDataType";

export default function useStorer(key: StoreKeyType, data: StoreDataType) {
  const {setState, store} = useContext(StoreContext);
  store[key] = data;
  useEffect(() => {
    setState(key, data);
  }, [setState, key, data]);
  return data;
}
