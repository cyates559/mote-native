import {useContext} from "react";
import FormContext from "./FormContext";
import {FormControllerType} from "./types";

export default function useForm<D extends Record<string, any>=any>(): FormControllerType<D> {
  return useContext(FormContext) as any
}
