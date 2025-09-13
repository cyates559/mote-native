import TextInput, {TextInputPropsType} from "./TextInput";
import {SetStateAction, useCallback, useRef, useState} from "react";

export interface DebouncedTextInputPropsType extends TextInputPropsType {}

export default function DebouncedTextInput(props: DebouncedTextInputPropsType) {
  const {defaultValue=null, value, setValue, ...rest} = props;
  const editable = useRef<boolean>(false);
  const [unsavedValue, _setUnsavedValue] = useState<string | null>(value?? defaultValue?? null);
  const unsavedValueRef = useRef<string | null>(unsavedValue);
  const onFocus = useCallback(() => {
    editable.current = true;
  }, [setValue]);
  const onBlur = useCallback(() => {
    if(setValue) {
      setValue(unsavedValueRef.current);
    }
    editable.current = false;
  }, [setValue]);
  const setUnsavedValue = useCallback((val: SetStateAction<string | null>) => {
    unsavedValueRef.current = val instanceof Function? val(unsavedValueRef.current): val;
    _setUnsavedValue(unsavedValueRef.current);
  }, []);

  return <TextInput
    value={unsavedValue?? ""}
    setValue={setUnsavedValue}
    onFocus={onFocus}
    onBlur={onBlur}
    {...rest}
  />;
}