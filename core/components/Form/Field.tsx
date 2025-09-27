import {StylePropsType} from "@/core/styled";
import {ComponentType, Dispatch, SetStateAction} from "react";
import useFormField from "./useFormField";

export type InputComponentPropsType<T> = StylePropsType & {
  value: T;
  setValue?: Dispatch<SetStateAction<T>>;
  enabled?: boolean;
}

export type FieldPropsType<PropsType extends InputComponentPropsType<T>, T=any> = {
  type: ComponentType<PropsType>;
  name: string;
} & {
  [P in keyof Omit<PropsType, "value" | "setValue">]: PropsType[P];
}


export default function Field<P extends InputComponentPropsType<T>, T=any>(props: FieldPropsType<P, T>) {
  const {type: Type, name, ...rest} = props;
  return <Type {...rest as any} {...useFormField(name)}/>
}