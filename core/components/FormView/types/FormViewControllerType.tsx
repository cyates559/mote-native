import {ReactNode} from "react";
import {LayoutChangeEvent} from "react-native";

export default interface FormViewControllerType {
  containerWidth: number;
  childPairs: [ReactNode, ReactNode][];
  onLayout: (e: LayoutChangeEvent) => void;
  isWrapped: boolean;
  leftWidth: number;
  rightWidth: number;
  onLeftSizeChange: (index: number, width: number, height: number) => void;
  onRightSizeChange: (index: number, width: number, height: number) => void;
}