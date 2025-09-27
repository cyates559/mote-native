import {Dispatch, SetStateAction} from "react";

export default interface FormControllerType<D extends Record<string, any>=any> {
  store: D;
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  submit: () => void;
  onSubmit: (data: D) => void;
  setValue: <K extends keyof D>(key: K, v: SetStateAction<D[K]>) => void
}
