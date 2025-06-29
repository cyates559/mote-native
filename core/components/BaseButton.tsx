import {ReactNode, useCallback, useMemo, useState} from "react";
import {styled, Theme, useTheme, Pressable, ViewStyle, StyleSheet, PressableProps, isTextNode} from "@/core/styled";
import T from "./T";

export interface BaseButtonPropsType extends PressableProps {
  hoverStyle?: ViewStyle;
  pressedStyle?: ViewStyle;
  selectedStyle?: ViewStyle;
  compact?: boolean;
  selected?: boolean;
  foreground?: string;
  children: ReactNode;
  forwardRef?: any;
}

const ButtonComponent = styled(Pressable, {
  style: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

const PaddedButtonComponent = styled(ButtonComponent, {
  style: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
  },
});

export default function BaseButton(startProps: BaseButtonPropsType) {
  const {buttonPressedBackgroundColor, buttonHoverBackgroundColor, buttonColor} = useTheme();
  const {
    pressedStyle={backgroundColor: buttonPressedBackgroundColor},
    hoverStyle={backgroundColor: buttonHoverBackgroundColor},
    selectedStyle={backgroundColor: buttonPressedBackgroundColor},
    compact=false,
    selected=false,
    children,
    foreground,
    ...props
  } = startProps;
  const [hover, setHover] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const onHoverOut = useCallback(() => setHover(false), [setHover]);
  const onHoverIn = useCallback(() => setHover(true), [setHover]);
  const onPressOut = useCallback(() => {setHover(false);setPressed(false);}, [setPressed, setHover]);
  const onPressIn = useCallback(() => setPressed(true), [setPressed]);
  const style = useMemo(() => StyleSheet.flatten([
    props.style,
    pressed? pressedStyle: hover? hoverStyle: null,
    selected? selectedStyle: null,
  ]), [props.style, hover, pressed, selected]);
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
    ...props, style, onHoverOut, onHoverIn, onPressOut, onPressIn,
    children: typedChildren,
  };
  return (
    <Theme color={foreground?? buttonColor}>
      {compact? <ButtonComponent {...finalProps}/>: <PaddedButtonComponent {...finalProps}/>}
    </Theme>
  )
}

BaseButton.rejectRef = true;