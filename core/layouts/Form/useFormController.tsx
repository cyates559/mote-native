import {useRef, useState} from "react";
import {FormControllerType} from "@/core/layouts/Form/types";

export interface FormControllerPropsType<D> {
  startData: D;
  onSubmit: (data: D) => void;
}

export default function useFormController<D>(props: FormControllerPropsType<D>): FormControllerType {
  const {startData, onSubmit} = props;
  const store = useRef<D>(startData);
  const [enabled, setEnabled] = useState<boolean>(true);
  return {
    enabled, setEnabled,
    onSubmit, store: store.current,
  };
}
