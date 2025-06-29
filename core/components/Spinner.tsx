import {styled, ActivityIndicator, ThemeType} from "@/core/styled";

const Spinner = styled(ActivityIndicator, {
  color: ({spinnerColor}: ThemeType) => spinnerColor,
});

export default Spinner;
