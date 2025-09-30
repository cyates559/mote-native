import {ReactNode, useMemo} from "react"
import {styled, ThemeType, View, ViewPropsType, ViewStyleType} from "@/core/styled";
import {T, H} from "../Text";
import {Spinner} from "../Spinner";
import {Icon, IconNameType} from "../Icon";
import BackgroundScrollView from "@/core/components/View/BackgroundScrollView";
import {StyleSheet} from "react-native";

export interface LeafPropsType extends ViewPropsType {
  loading?: boolean;
  splash?: ReactNode | true;
  header?: ReactNode;
  text?: ReactNode;
  children?: ReactNode;
  icon?: IconNameType;
  outerStyle?: ViewStyleType;
  innerStyle?: ViewStyleType;
}

const baseOuterStyle: ViewStyleType = {

}

const baseStyle: ViewStyleType = {
  alignItems: "center",
  justifyContent: "center",
  gap: 36,
  marginTop: "auto",
  marginBottom: "auto",
  padding: 48,
};

export const DeadEndHeader = styled(H, {
  h: 2,
  style: {
    textAlign: "center",
  },
});

export const HeaderIcon = styled(Icon, {
  fill: ({color}: ThemeType) => color,
  size: 64,
});

export const DeadEndActions = styled(View, {
  style: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
});

export const DeadEndSpinner = styled(Spinner, {
  size: "large",
});


export default function Leaf(props: LeafPropsType) {
  const {loading, style, innerStyle, outerStyle, splash, icon, header, text, children, ...rest} = props;
  const ccs = useMemo(() => StyleSheet.flatten([baseStyle, style]), [style]);
  const os = useMemo(() => StyleSheet.flatten([baseOuterStyle, outerStyle]), [outerStyle]);
  return (
    <BackgroundScrollView style={os} contentContainerStyle={ccs as any} {...rest}>
      {loading && <DeadEndSpinner/>}
      {splash === true? null: splash}
      {icon && <HeaderIcon name={icon}/>}
      {header && <DeadEndHeader>
        {header}
      </DeadEndHeader>}
      {text && <T>{text}</T>}
      {splash === true? children: children && <DeadEndActions style={innerStyle} children={children}/>}
    </BackgroundScrollView>
  )
}