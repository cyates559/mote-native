import {Platform} from "react-native";
import {TextInput, TextInputPropsType} from "../TextInput";
import {StyledBorderedBackgroundScrollView, StyledBorderedBackgroundView, StyledScrollView, ScrollView, styled} from "../View";
import {SubTheme} from "@/core/theme";

export type CodePropsType = Omit<TextInputPropsType, "value"> & {children: string};


const WebView = styled(StyledBorderedBackgroundView, {
  style: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    overflow: "hidden",
  }
});

function WebCode(props: CodePropsType) {
  const {children, theme="Input"} = props;
  return (
    <SubTheme theme={theme}>
        <StyledBorderedBackgroundScrollView horizontal>
          <pre style={{width: 0}} children={children}/>
        </StyledBorderedBackgroundScrollView>
    </SubTheme>
  );
}

function NativeCode({children, ...rest}: CodePropsType) {
  return (
    <TextInput multiline value={children} {...rest}/>
  );
}

export default function Code(props: CodePropsType ) {
  return Platform.select({
    ios: <NativeCode {...props}/>,
    android: <NativeCode {...props}/>,
    web: <WebCode {...props}/>,
  });
}