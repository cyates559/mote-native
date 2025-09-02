import {ReactNode, useEffect, useState} from "react";
import {Loading} from "@/core/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageContext from "./StorageContext";
import StorageStoreType from "./types/StorageStoreType";

export interface AsyncStorageLayoutPropsType {
  children?: ReactNode;
}

export default function AsyncStorageLayout(props: AsyncStorageLayoutPropsType) {
  const [storedData, setStoredData] = useState<null | StorageStoreType>(null);
  useEffect(() => {
    if(storedData === null) {
      AsyncStorage.getAllKeys().then(allKeys => AsyncStorage.multiGet(allKeys).then(pairs =>
        setStoredData(
          pairs.reduce((store, [key, value]) => {
            store[key] = value;
            return store;
          }, {} as StorageStoreType)
        )
      ));
    }
  }, [storedData, setStoredData]);
  if(storedData === null) {
    return <Loading text="Loading Saved State..."/>
  }
  return (
    <StorageContext.Provider value={storedData}>
      {props.children}
    </StorageContext.Provider>
  );
}