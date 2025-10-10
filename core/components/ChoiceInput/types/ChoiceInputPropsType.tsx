import OptionType from "./OptionType";
import {Dispatch, SetStateAction} from "react";

export default interface ChoiceInputPropsType<T> {
  children?: OptionType<T>[],
  value: T,
  setValue: Dispatch<SetStateAction<T>>,
}
