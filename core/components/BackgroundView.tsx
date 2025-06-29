import {styled, View} from "@/core/styled";
import {ThemeType} from "@/core/theme";

const BackgroundView = styled(View, {
  style: ({backgroundColor}: ThemeType) => ({backgroundColor}),
})

export default BackgroundView;
