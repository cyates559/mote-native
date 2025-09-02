import {useContext} from "react";
import FormContext from "./FormContext";
import {FormControllerType} from "@/core/layouts/Form/types";

export default function useForm<D extends Record<string, any>=any>(): FormControllerType<D> {
  return useContext(FormContext) as any
}
