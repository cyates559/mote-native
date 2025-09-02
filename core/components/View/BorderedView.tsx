import {styled, View, ThemeType} from "@/core/styled";

const BorderedView = styled(View, {
  style: ({borderColor}: ThemeType) => ({borderColor}),
})

export default BorderedView;
