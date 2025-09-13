import {styled, ScrollView, ThemeType} from "@/core/styled";

const BorderedBackgroundScrollView = styled(ScrollView, {
  style: ({borderColor, backgroundColor}: ThemeType) => ({borderColor, backgroundColor}),
})

export default BorderedBackgroundScrollView;
