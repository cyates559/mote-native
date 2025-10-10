import {Dispatch, SetStateAction} from "react";
import FormErrorsType from "@/core/components/Form/types/FormErrorsType";

export default interface FormControllerType<D extends Record<string, any>=any> {
  store: D;
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  submit: () => void;
  onSubmit: (form: FormControllerType<D>) => void;
  setValue: <K extends keyof D>(key: K, v: SetStateAction<D[K]>) => void;
  errors?: FormErrorsType<D>;
  setErrors: Dispatch<SetStateAction<undefined | FormErrorsType<D>>>;
}
