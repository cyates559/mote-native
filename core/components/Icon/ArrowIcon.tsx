import Icon, {IconNameType, IconPropsType} from "./Icon";
import {useMemo} from "react";

export type ArrowType = "chevron" | "default";

export type ArrowDirectionType = "up" | "down" | "left" | "right";

export interface ArrowIconPropsType extends Omit<IconPropsType, "name"> {
  type?: ArrowType;
  direction: ArrowDirectionType;
}

export function getArrowTypePrefix(type: ArrowType) {
  switch(type) {
    case "chevron":
      return "Chevron";
    case "default":
      return "Arrow";
  }
}

export function getArrowDirectionSuffix(direction: ArrowDirectionType) {
  switch(direction) {
    case "up":
      return "Up";
    case "down":
      return "Down";
    case "left":
      return "Left";
    case "right":
      return "Right";
  }
}

export default function ArrowIcon(props: ArrowIconPropsType) {
  const {type="default", direction, ...rest} = props;
  const name = useMemo(() => (
    `${getArrowTypePrefix(type)}${getArrowDirectionSuffix(direction)}` as IconNameType
  ), [type, direction]);
  return <Icon name={name} {...rest}/>
}