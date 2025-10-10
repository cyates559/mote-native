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

export const TEXT_INPUT_FLOATING_ICON_SIZE = 16
export const TEXT_INPUT_FLOATING_ICON_OUTER_SIZE = 26;
export const TEXT_INPUT_FLOATING_ICON_MARGIN = 6;

const Container = styled(View, {
  style: {
    alignItems: "stretch",
    justifyContent: "center",
  },
});

const FloatingIcon = styled(Icon, {
  size: TEXT_INPUT_FLOATING_ICON_SIZE,
  style: {
    position: "absolute",
    start: TEXT_INPUT_FLOATING_ICON_MARGIN,
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
    paddingStart: TEXT_INPUT_FLOATING_ICON_OUTER_SIZE,
  }
});

export default function TextInput(props: TextInputPropsType) {
  const {value, theme="Input", icon, setValue, children, ...rest} = props;
  return (
    <SubTheme theme={theme} secondary={!value}>
      <Container>
        {icon?
          <>
            <ComponentWithIcon value={value?? ""} onChangeText={setValue} {...rest}/>
            <FloatingIcon name={icon}/>
            {children}
          </>:
          <>
            <Component value={value?? ""} onChangeText={setValue} {...rest}/>
            {children}
          </>
        }
      </Container>
    </SubTheme>
  );
}

TextInput.rejectRef = true;