import {styled, View, ThemeType} from "@/core/styled";

const StyledBorderedBackgroundView = styled(View, {
  style: ({style, borderColor, backgroundColor}: ThemeType) => ({...style, borderColor, backgroundColor}),
})

export default StyledBorderedBackgroundView;
