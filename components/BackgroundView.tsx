import {styled, View, ThemeType} from "@/styled";

const BackgroundView = styled(View, {
  style: ({backgroundColor}: ThemeType) => ({backgroundColor}),
})

export default BackgroundView;
