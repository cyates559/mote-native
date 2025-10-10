import {ReactNode, useContext, useEffect, useRef} from "react";
import LayerContext from "./LayerContext";

export interface LayerPropsType {
  children?: ReactNode;
}

export default function Layer({children}: LayerPropsType) {
  const controller = useContext(LayerContext);
  const indexRef = useRef<number>();
  useEffect(() => {
    const {mount, update} = controller;
    if(indexRef.current === undefined) {
      indexRef.current = mount(children);
    } else {
      update(indexRef.current, children);
    }
  }, [children, controller]);
  useEffect(() => () => {
    if(indexRef.current !== undefined) {
      controller.unmount(indexRef.current);
      indexRef.current = undefined;
    }
  }, [controller.unmount]);
  return null;
}