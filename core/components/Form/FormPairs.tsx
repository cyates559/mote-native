import {ReactNode} from "react";
import {View, ViewStyleType, ViewPropsType} from "../View";
import useFormPairs from "./useFormPairs";

export interface FormPairsPropsType extends ViewPropsType {
  children: ReactNode[];
  leftStyle?: ViewStyleType;
  rightStyle?: ViewStyleType;
}

export default function FormPairs(props: FormPairsPropsType) {
  const {children, leftStyle, rightStyle, ...rest} = props;
  return useFormPairs(children).map(([left, right], i) =>
    <View key={i} {...rest}>
      <View style={leftStyle} children={left}/>
      <View style={rightStyle} children={right}/>
    </View>
  );
}