import {ReactNode, useCallback, useMemo, useState} from "react";
import {
  styled,
  Pressable,
  ViewStyleType,
  PressablePropsType,
  isTextNode,
  SubTheme,
  ThemeNamePropsType,
  ThemeType,
} from "@/core/styled";
import {T} from "../Text";

export interface ButtonPropsType extends PressablePropsType, Partial<ThemeNamePropsType> {
  // style?: ViewStyleType;
  hoverStyle?: ViewStyleType;
  pressedStyle?: ViewStyleType;
  selectedStyle?: ViewStyleType;
  compact?: boolean;
  selected?: boolean;
  secondary?: boolean;
  children?: ReactNode;
  forwardRef?: any;
}

const ButtonComponent = styled(Pressable, {
  style: ({style, backgroundColor, borderColor}: ThemeType): ViewStyleType => ({
    ...style,
    backgroundColor,
    borderColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  }),
});

const PaddedButtonComponent = styled(ButtonComponent, {
  style: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
});

export default function Button(startProps: ButtonPropsType) {
  const {compact=false, secondary, selected=false, children, theme="Null", ...props} = startProps;
  const [hovered, setHovered] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const onHoverOut = useCallback(() => setHovered(false), [setHovered]);
  const onHoverIn = useCallback(() => setHovered(true), [setHovered]);
  const onPressOut = useCallback(() => {setHovered(false);setPressed(false);}, [setPressed, setHovered]);
  const onPressIn = useCallback(() => setPressed(true), [setPressed]);
  const typedChildren = useMemo(() => {
    if(isTextNode(children)) {
      return (
        <T>
          {children as any}
        </T>
      );
    } else { return children; }
  }, [children]);
  const finalProps = {
    ...props, onHoverOut, onHoverIn, onPressOut, onPressIn,
    children: typedChildren,
  };
  return (
    <SubTheme theme={theme} pressed={pressed} hovered={hovered} selected={selected} secondary={secondary}>
      {compact? <ButtonComponent {...finalProps}/>: <PaddedButtonComponent {...finalProps}/>}
    </SubTheme>
  );
}

Button.rejectRef = true;