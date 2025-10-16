import {Dispatch, Ref, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {OptionType} from "../types";
import {CoreTextInput} from "@/core";
import {NativeSyntheticEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {TextInputKeyPressEventData} from "react-native/Libraries/Components/TextInput/TextInput";

export interface SelectControllerPropsType<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  searchValue: string | null;
  setSearchValue: Dispatch<SetStateAction<string | null>>;
  children: OptionType<T>[];
  onEscape?: () => void;
}

export interface SelectControllerType<T> {
  focused: boolean;
  nextValue: T;
  textInputRef: Ref<CoreTextInput>;
  setNextValue: Dispatch<SetStateAction<T>>;
  onKeyPress: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onFocusListItem: (value: T) => void;
  onPressListItem: (value: T) => void;
}

export default function useSelect<T>(props: SelectControllerPropsType<T>): SelectControllerType<T> {
  const {value, setValue, searchValue, setSearchValue, children, onEscape} = props;
  const [nextValue, setNextValue] = useState<T>(value);
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<T>(value);
  const nextRef = useRef<T>(nextValue);
  const childrenRef = useRef<OptionType<T>[]>(children);
  const textInputRef = useRef<CoreTextInput>(null);
  // Save value to a ref
  useEffect(() => {ref.current = value}, [value, ref]);
  // Save nextValue to a ref
  useEffect(() => {nextRef.current = nextValue}, [nextValue, nextRef]);
  // Save children to a ref
  useEffect(() => {childrenRef.current = children}, [children, childrenRef]);
  // when searching, set nextValue to value/children
  useEffect(() => {
    if(focused && searchValue) {
      setNextValue(children[0]?.props.value);
    }
  }, [searchValue, focused, setNextValue]);
  // Set value to nextValue when closing, set search text based on current value as well
  useEffect(() => {
    if(!focused){
      setValue(nextRef.current);
      setSearchValue(childrenRef.current.find(({props}) => props.value === nextRef.current)?.props.children?? null);
    }
  }, [focused, setValue, nextRef]);
  // when value changes, nextValue should copy it
  useEffect(() => setNextValue(value), [value, setNextValue])
  const onFocus = useCallback(() => {
    setFocused(true)
  }, [setFocused]);
  const onBlur = useCallback(() => {
    setTimeout(setFocused, 1, false);
  }, [setFocused]);
  const onPressListItem = useCallback((value: T) => {
    setValue(value);
    textInputRef.current?.blur();
  }, []);
  const onKeyPress = useCallback(({nativeEvent: {key}}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    switch(key) {
      case "ArrowUp":
        setNextValue(prevNextValue => {
          const c = childrenRef.current;
          const prevIndex = c.findIndex(child => child.props.value === prevNextValue);
          return c[prevIndex === -1? 0: prevIndex - 1]?.props.value?? prevNextValue;
        })
        return;
      case "ArrowDown":
        setNextValue(prevNextValue => {
          const c = childrenRef.current;
          const prevIndex = c.findIndex(child => child.props.value === prevNextValue);
          return c[prevIndex === -1? 0: prevIndex + 1 ]?.props.value?? prevNextValue;
        });
        return;
      case "Escape":
        setNextValue(ref.current);
        textInputRef.current?.blur();
        onEscape?.();
        return;
    }
  }, [setNextValue, ref, childrenRef]);
  return {
    focused, onFocus, onBlur, nextValue, setNextValue,
    onKeyPress, textInputRef, onFocusListItem: setNextValue, onPressListItem
  };
}