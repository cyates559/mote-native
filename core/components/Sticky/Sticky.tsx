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

export interface StickyPropsType extends Omit<ViewPropsType, "children">, LayerPropsType {
  innerStyle?: ViewStyleType;
}

export default function Sticky({style, innerStyle, ...rest}: StickyPropsType) {
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
  const innerSheet: ViewStyleType = useMemo(() => StyleSheet.flatten([innerStyle, {
    left: position[0], top: position[1],
  }]), [position[0], position[1]])
  return (
    <Anchor forwardRef={anchor} style={style}>
      <Layer>
        <Container onLayout={onLayout} style={innerSheet} {...rest}/>
      </Layer>
    </Anchor>
  );
}