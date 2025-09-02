import {styled, View, ThemeType} from "@/core/styled";

const BorderedBackgroundView = styled(View, {
  style: ({borderColor, backgroundColor}: ThemeType) => ({borderColor, backgroundColor}),
})

export default BorderedBackgroundView;
