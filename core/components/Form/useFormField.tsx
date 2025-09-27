import {Dispatch, SetStateAction, useCallback, useContext, useState} from "react";
import FormContext from "./FormContext";

export interface FormFieldControllerType<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  enabled: boolean;
}

export default function useFormField<T>(key: string): FormFieldControllerType<T> {
  const {store, enabled, setValue: setFormValue} = useContext(FormContext);
  const setValue = useCallback((value: SetStateAction<T>) => setFormValue(key, value), [key, setFormValue]);
  return {value: store[key], setValue, enabled};
}