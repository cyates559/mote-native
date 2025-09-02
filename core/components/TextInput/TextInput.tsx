import {
  styled,
  CoreTextInputPropsType,
  CoreTextInput,
  SubTheme,
  ThemeNamePropsType,
  ThemeType,
  TextStyleType
} from "@/core/styled";
import Row from "@/core/components/View/Row";
import {Dispatch, SetStateAction, useMemo} from "react";
import {Icon, IconNameType} from "../Icon";

export interface TextInputPropsType extends
  Omit<CoreTextInputPropsType, "value" | "placeholderTextColor">,
  Partial<ThemeNamePropsType>
{
  icon?: IconNameType
  value: string | null;
  setValue?: Dispatch<SetStateAction<string | null>>;
}

const IconPositioner = styled(Row, {
  style: {
    position: "absolute",
    alignItems: "center",
  },
});

const Component = styled(CoreTextInput, {
  placeholderTextColor: ({secondaryColor}: ThemeType) => secondaryColor,
  style: ({style, backgroundColor, borderColor, color}: ThemeType): TextStyleType => ({
    color, backgroundColor, borderColor, ...style,
  }),
});

export default function TextInput(props: TextInputPropsType) {
  const {value, theme="Input", icon, setValue, ...rest} = props;
  return (
    <SubTheme theme={theme} secondary={!value}>
      <Component value={value?? ""} onChangeText={setValue} {...rest}>
        {icon &&
          <IconPositioner>
            <Icon name={icon}/>
          </IconPositioner>
        }
      </Component>
    </SubTheme>
  );
}