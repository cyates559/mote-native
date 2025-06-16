import {styled, ActivityIndicator, ThemeType} from "@/styled";

const Spinner = styled(ActivityIndicator, {
  color: ({spinnerColor}: ThemeType) => spinnerColor,
});

export default Spinner;
