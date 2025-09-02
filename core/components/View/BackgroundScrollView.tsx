import {styled, ScrollView, ThemeType} from "@/core/styled";

const BackgroundScrollView = styled(ScrollView, {
  style: ({backgroundColor}: ThemeType) => ({backgroundColor}),
})

export default BackgroundScrollView;
