import {ReactNode, useCallback, useMemo, useState} from "react";
import {styled, Theme, useTheme, Pressable, ViewStyle, StyleSheet, PressableProps} from "@/styled";
import T from "./T";
import isTextNode from "@/utils/isTextNode";

export interface BaseButtonPropsType extends PressableProps {
  hoverStyle?: ViewStyle;
  pressedStyle?: ViewStyle;
  selectedStyle?: ViewStyle;
  compact?: boolean;
  selected?: boolean;
  foreground?: string;
  children: ReactNode;
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
    paddingHorizontal: 15,
    paddingVertical: 6,
    gap: 12,
  },
});

export default function BaseButton(startProps: BaseButtonPropsType) {
  const {buttonPressedColor, buttonHoverColor, color} = useTheme();
  const {
    pressedStyle={backgroundColor: buttonPressedColor},
    hoverStyle={backgroundColor: buttonHoverColor},
    selectedStyle={backgroundColor: buttonPressedColor},
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
    <Theme color={foreground?? color}>
      {compact? <ButtonComponent {...finalProps}/>: <PaddedButtonComponent {...finalProps}/>}
    </Theme>
  )
}

BaseButton.rejectRef = true;