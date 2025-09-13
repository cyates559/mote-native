import {ScrollViewPropsType, ViewStyleType, useTheme} from "@/core/styled";
import BorderedView from "./BorderedView";
import BackgroundScrollView from "@/core/components/View/BackgroundScrollView";
import {StyleSheet} from "react-native";
import { useMemo } from "react";

export type StyledBorderedBackgroundScrollViewPropsType = ScrollViewPropsType & {
  outerStyle?: ViewStyleType;
}

export default function StyledBorderedBackgroundScrollView(props: StyledBorderedBackgroundScrollViewPropsType) {
  const {outerStyle, contentContainerStyle, ...rest} = props;
  const {style: {borderWidth, borderRadius, ...themeStyle}} = useTheme();
  const outerSheet = useMemo(() => StyleSheet.flatten([{
    // HEY! If you came here to copy this code that probably means its time to split up
    // the Theme.style into Theme.style and Theme.borderStyle or something like that...
    borderWidth,
    borderRadius,
    overflow: "hidden"
  } as ViewStyleType, outerStyle]), [borderWidth, outerStyle])
  const sheet = useMemo(() => StyleSheet.flatten([themeStyle, contentContainerStyle]), [themeStyle, contentContainerStyle])
  return (
    <BorderedView style={outerSheet}>
      <BackgroundScrollView contentContainerStyle={sheet} {...rest}/>
    </BorderedView>
  )
}
