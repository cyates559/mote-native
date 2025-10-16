import {SetStateAction, useCallback, useContext} from "react";
import FormContext from "./FormContext";
import {FormFieldControllerType} from "./useFormField";

export interface FormFieldControllerWithErrorsType<T> extends FormFieldControllerType<T> {
  errors: string[];
}

export default function useFormFieldWithErrors<T>(key: string): FormFieldControllerWithErrorsType<T> {
  const {store, enabled, setValue: setFormValue, errors: allErrors} = useContext(FormContext);
  const errors = allErrors?.[key]?? [];
  const setValue = useCallback((value: SetStateAction<T>) => setFormValue(key, value), [key, setFormValue]);
  return {value: store[key], setValue, enabled, errors};
}