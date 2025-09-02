import {StoreDataType, StoreKeyType} from "@/core/store";
import {useContext, useEffect} from "react";
import StoreContext from "./StoreContext";

function SingleStorer({storeKey, data}: {storeKey: StoreKeyType, data: StoreDataType}) {
  const {setState, store} = useContext(StoreContext);
  store[storeKey] = data;
  useEffect(() => {
    setState(storeKey, data);
  }, [setState, storeKey, data]);
  return null;
}

export default function Storer(props: Record<StoreKeyType, StoreDataType>) {
  return Object.keys(props).map(key => <SingleStorer key={key} storeKey={key} data={props[key]}/>);
}
