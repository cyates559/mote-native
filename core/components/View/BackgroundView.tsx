import {styled, View, ThemeType} from "@/core/styled";

const BackgroundView = styled(View, {
  style: ({backgroundColor}: ThemeType) => ({backgroundColor}),
})

export default BackgroundView;
