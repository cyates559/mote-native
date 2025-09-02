import {Dispatch, SetStateAction} from "react";

export default interface FormControllerType<D extends Record<string, any>=any> {
  store: D;
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: D) => void;
}
