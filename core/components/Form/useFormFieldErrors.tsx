import {useContext} from "react";
import FormContext from "./FormContext";

export default function useFormFieldErrors(key: string): string[] {
  const {errors: allErrors} = useContext(FormContext);
  return allErrors?.[key]?? [];
}
