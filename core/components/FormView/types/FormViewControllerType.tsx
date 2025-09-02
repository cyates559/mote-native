import {ReactNode} from "react";
import {LayoutChangeEvent} from "react-native";

export default interface FormViewControllerType {
  containerWidth: number;
  childPairs: [ReactNode, ReactNode][];
  onLayout: (e: LayoutChangeEvent) => void;
  isWrapped: boolean;
  leftWidth: number;
  rightWidth: number;
  onLeftWidthChange: (index: number, width: number) => void;
  onRightWidthChange: (index: number, width: number) => void;
}