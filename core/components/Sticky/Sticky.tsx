import {styled, View} from "@/core/components/View";
import {Layer, LayerPropsType} from "@/core/components/Layer";
import {StyleSheet, useWindowDimensions} from "react-native";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {ViewPropsType, ViewStyleType} from "@/core/styled";

const Anchor = styled(View, {
  style: {
    width: 0,
    height: 0,
    // borderWidth: 2,
  }
});

const Container = styled(View, {
  style: {
    position: "absolute",
  }
});

export type StickyAlignType = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface StickyPropsType extends Omit<ViewPropsType, "children">, LayerPropsType {
  align?: StickyAlignType;
  innerStyle?: ViewStyleType;
}

export function getStickyPositionStyle(x: number, y: number, align: StickyAlignType): ViewStyleType {
  switch(align) {
    case "top-left": return {top: y, left: x,};
    case "top-right": return {top: y, right: x,};
    case "bottom-left": return {bottom: y, left: x,};
    case "bottom-right": return {bottom: y, right: x,};
  }
}

export default function Sticky({style, align="top-left", innerStyle, ...rest}: StickyPropsType) {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const anchor = useRef<View>();
  const window = useWindowDimensions();
  const onLayout = useCallback(() => (
    anchor.current?.measure((x, y, w, h, pageX, pageY) => setPosition(prev => {
      if(prev[0] === pageX && prev[1] === pageY) { return prev; }
      return [pageX, pageY];
    }))
  ), [anchor]);
  useEffect(onLayout, [window.width, window.height]);
  const [x, y] = position;
  const innerSheet: ViewStyleType = useMemo(() => StyleSheet.flatten(
    [innerStyle, getStickyPositionStyle(x, y, align)]
  ), [x, y, align])
  return (
    <Anchor forwardRef={anchor} style={style}>
      <Layer>
        <Container onLayout={onLayout} style={innerSheet} {...rest}/>
      </Layer>
    </Anchor>
  );
}