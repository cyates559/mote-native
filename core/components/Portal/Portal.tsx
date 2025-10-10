import {styled, View} from "@/core/components/View";
import {Layer, LayerPropsType} from "@/core/components/Layer";
import {LayoutChangeEvent, LayoutRectangle} from "react-native";
import {useCallback, useMemo, useState} from "react";
import {ViewStyleType} from "@/core/styled";

const Spacer = styled(View, {
  style: {
  }
});

const Chell = styled(View, {
  style: {
    position: "absolute",
  }
});

export interface PortalPropsType extends LayerPropsType {
  sizing: "horizontal" | "vertical",
}


// I wrote this for the select and then realized I don't want to use it for the select...
// It might be useful though:
// Portal takes a component (Chell) and renders it in a different layer,
// leaving behind a space in the original layer (the Spacer)
// if sizing = horizontal, we use the width of Chell (and she's wide) to figure out how much
// space it takes in the original layer, and for sizing = vertical we use height instead of width.
// The remaining dimension: width or height, as well as the X and Y position come from the Spacer.
// This is probably not complete and may have issues with flex-direction or scrolling (its untested)
export default function Portal({sizing, ...rest}: PortalPropsType) {
  const [position, setPosition] = useState<LayoutRectangle>({x: 0, y: 0, width: 0, height: 0});
  const [size, setSize] = useState<[number, number]>([0, 0]);
  const onPosition = useCallback(({nativeEvent: {layout}}: LayoutChangeEvent) => (
    // target?.measure((x, y, width, height, pageX, pageY) => setPosition([x, y]))
    setPosition(layout)
  ), []);

  const onResize = useCallback(({nativeEvent: {layout: {width, height}}}: LayoutChangeEvent) => (
    setSize([width, height])
  ), []);
  const innerDimension = useMemo(() => size[sizing === "horizontal"? 0: 1], [size, sizing]);
  const outerPositionStyle: ViewStyleType = useMemo(() => sizing === "horizontal"?
    {width: innerDimension}:
    {height: innerDimension},
  [innerDimension, sizing]);
  const innerPositionStyle: ViewStyleType = useMemo(() => (sizing === "horizontal"?
    {...position, width: "auto"}: // Let the component pick its own width if sizing = horizontal
    {...position, height: "auto"} // Let the component pick its own height if sizing = vertical
  ), [position, sizing])
  return (
    <Spacer onLayout={onPosition} style={outerPositionStyle}>
      <Layer>
        <Chell style={innerPositionStyle} onLayout={onResize} {...rest}/>
      </Layer>
    </Spacer>
  );
}