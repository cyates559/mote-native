import {
  styled,
  CoreTextInputPropsType,
  CoreTextInput,
  SubTheme,
  ThemeNamePropsType,
  ThemeType,
  TextStyleType,
  View,
} from "@/core/styled";
import {Dispatch, SetStateAction} from "react";
import {Icon, IconNameType} from "../Icon";

export interface TextInputPropsType extends
  Omit<CoreTextInputPropsType, "value" | "placeholderTextColor">,
  Partial<ThemeNamePropsType>
{
  icon?: IconNameType
  value: string | null;
  setValue?: Dispatch<SetStateAction<string | null>>;
  enabled?: boolean;
}

const Container = styled(View, {
  style: {
    alignItems: "stretch",
    justifyContent: "center",
  },
});

const FloatingIcon = styled(Icon, {
  size: 16,
  style: {
    position: "absolute",
    start: 6,
  },
});

const Component = styled(CoreTextInput, {
  multiline: false,
  numberOfLines: 1,
  placeholderTextColor: ({secondaryColor}: ThemeType) => secondaryColor,
  style: ({style, backgroundColor, borderColor, color}: ThemeType): TextStyleType => ({
    color, backgroundColor, borderColor, ...style,
  }),
});

const ComponentWithIcon = styled(Component, {
  style: {
    paddingLeft: 26,
  }
});

export default function TextInput(props: TextInputPropsType) {
  const {value, theme="Input", icon, setValue, ...rest} = props;
  return (
    <SubTheme theme={theme} secondary={!value}>
      <Container>
        {icon?
          <>
            <ComponentWithIcon value={value?? ""} onChangeText={setValue} {...rest}/>
            <FloatingIcon name={icon}/>
          </>:
          <Component value={value?? ""} onChangeText={setValue} {...rest}/>
        }
      </Container>
    </SubTheme>
  );
}