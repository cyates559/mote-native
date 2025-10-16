import {ReactNode} from "react";
import {View, ViewStyleType, ViewPropsType} from "../View";
import useFormFieldGroups from "./useFormFieldGroups";

export interface FormFieldGroupsPropsType extends ViewPropsType {
  children: ReactNode[];
  labelStyle?: ViewStyleType;
  inputStyle?: ViewStyleType;
  errorsStyle?: ViewStyleType;
}

export default function FormFieldGroups(props: FormFieldGroupsPropsType) {
  const {children, labelStyle, inputStyle, errorsStyle, ...rest} = props;
  return useFormFieldGroups(children).map(([a, b, c], i) =>
    <View key={i} {...rest}>
      <View style={labelStyle} children={a}/>
      <View style={inputStyle} children={b}/>
      <View style={errorsStyle} children={c}/>
    </View>
  );
}