import {SetStateAction, useCallback, useRef, useState} from "react";
import {FormControllerType} from "./types";

export interface FormControllerPropsType<D> {
  startData: D;
  onSubmit: (data: D) => void;
}

export default function useFormController<D extends Record<string, any>>(
  props: FormControllerPropsType<D>
): FormControllerType<D> {
  const {startData, onSubmit} = props;
  const store = useRef<D>(startData);
  const [storeState, setStore] = useState(startData);
  const [enabled, setEnabled] = useState<boolean>(true);
  const submit = useCallback(() => onSubmit(store.current), [onSubmit]);
  const setValue = useCallback(<K extends keyof D>(key: K, value: SetStateAction<D[K]>) => {
    setStore(store.current = {...store.current, [key]: value instanceof Function? value(store.current[key]): value});
  }, [store, setStore]);
  return {enabled, setEnabled, submit, onSubmit, store: storeState, setValue};
}
