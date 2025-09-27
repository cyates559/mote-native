import {FormControllerType} from "./types";
import useFormController, {FormControllerPropsType} from "./useFormController";
import {useContext, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageContext from "../../layouts/AsyncStorageLayout/StorageContext";

export interface StoredFormControllerPropsType<D> extends Omit<FormControllerPropsType<D>, "startData"> {
  key: string;
  defaultData: D;
}

// Saves any changes to the form in storage (before you even submit the form)
export default function useLiveStoredFormController<D extends Record<string, any>>(
  {key, defaultData, ...rest}: StoredFormControllerPropsType<D>
): FormControllerType<D> {
  const storage = useContext(StorageContext);
  const formController = useFormController({...rest, startData: JSON.parse((storage[key]?? "null"))?? defaultData});
  useEffect(() => {
    storage[key] = JSON.stringify(formController.store);
    if (formController.store === null) {
      AsyncStorage.removeItem(key).catch(e => console.error("Storage removeItem error:", e));
    } else {
      const data = JSON.stringify(formController.store);
      AsyncStorage.setItem(key, data).catch(e => console.error("Storage setItem error:", e));
    }
  }, [formController.store, key]);
  return formController;
}
