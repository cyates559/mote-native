import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import StorageContext from "./StorageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type StringStatePairType = [string | null, Dispatch<SetStateAction<string | null>>];

export default function useStoredState(key: string, defaultValue: string | null = null): StringStatePairType {
  const storage = useContext(StorageContext);
  const storedValue = storage[key]?? defaultValue;
  const [data, setData] = useState<string | null>(storedValue);
  useEffect(() => {
    storage[key] = data;
    if (data === null) {
      AsyncStorage.removeItem(key).catch(e => console.error("Storage removeItem error:", e));
    } else {
      AsyncStorage.setItem(key, data).catch(e => console.error("Storage setItem error:", e));
    }
  }, [data, key]);
  return [data, setData];
}
