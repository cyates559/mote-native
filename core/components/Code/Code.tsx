import {Platform} from "react-native";
import {TextInput, TextInputPropsType} from "../TextInput";
import {StyledBorderedBackgroundScrollView} from "../View";
import {SubTheme, useTheme} from "@/core/theme";

export type CodePropsType = Omit<TextInputPropsType, "value"> & {children: string};


function WebCode(props: CodePropsType) {
  const {children, theme="Input"} = props;
  const {color} = useTheme();
  return (
    <SubTheme theme={theme}>
      <StyledBorderedBackgroundScrollView horizontal>
        <pre style={{width: 0, color} as any} children={children}/>
      </StyledBorderedBackgroundScrollView>
    </SubTheme>
  );
}

function NativeCode({children, ...rest}: CodePropsType) {
  return (
    <TextInput multiline numberOfLines={undefined} value={children} {...rest}/>
  );
}

export default function Code(props: CodePropsType ) {
  return Platform.select({
    ios: <NativeCode {...props}/>,
    android: <NativeCode {...props}/>,
    web: <WebCode {...props}/>,
  });
}