import {Dispatch, SetStateAction, useCallback, useContext, useState} from "react";
import FormContext from "./FormContext";

export interface FormFieldControllerType<T> {
  value: T | null;
  setValue: Dispatch<SetStateAction<T | null>>;
  enabled: boolean;
}

export default function useFormField<T>(key: string): FormFieldControllerType<T> {
  const {store, enabled} = useContext(FormContext);
  const [value, setValue] = useState<T | null>(store[key]);
  // Every time we render, just make sure the form has our latest state.
  store[key] = value;
  return {value, setValue, enabled};
}