import {styled, ScrollView, ThemeType} from "@/styled";

const BackgroundView = styled(ScrollView, {
  style: ({backgroundColor}: ThemeType) => ({backgroundColor}),
})

export default BackgroundView;
