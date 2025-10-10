import {SetStateAction, useCallback, useRef, useState} from "react";
import {FormControllerType} from "./types";
import FormErrorsType from "@/core/components/Form/types/FormErrorsType";

export interface FormControllerPropsType<D extends Record<string, any>> {
  startData: D;
  onSubmit: (form: FormControllerType<D>) => void;
}

export default function useFormController<D extends Record<string, any>>(
  props: FormControllerPropsType<D>
): FormControllerType<D> {
  const {startData, onSubmit} = props;
  const store = useRef<D>(startData);
  const [storeState, setStore] = useState(startData);
  const [enabled, setEnabled] = useState<boolean>(true);
  const setValue = useCallback(<K extends keyof D>(key: K, value: SetStateAction<D[K]>) => {
    setStore(store.current = {...store.current, [key]: value instanceof Function? value(store.current[key]): value});
  }, [store, setStore]);
  const [errors, setErrors] = useState<FormErrorsType<D>>();
  const submit = useCallback(() => {
    setErrors(undefined);
    onSubmit(ref.current);
  }, [onSubmit]);
  const controller: FormControllerType<D> = {
    enabled, setEnabled, submit, onSubmit, store: storeState, setValue, errors, setErrors
  };
  const ref = useRef<FormControllerType<D>>(controller);
  return ref.current = controller;
}
