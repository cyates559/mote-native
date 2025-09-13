import {styled, ScrollView, ThemeType, ViewStyleType} from "@/core/styled";
import {StyleSheet} from "react-native";

const StyledScrollView = styled(ScrollView, {
  style: ({style, borderColor, backgroundColor}: ThemeType) => StyleSheet.flatten<ViewStyleType>([
    style, {borderColor, backgroundColor}
  ]),
})

export default StyledScrollView;
