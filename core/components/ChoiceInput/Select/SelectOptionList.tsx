import {styled, ViewPropsType} from "@/core/components/View";
import {OptionType} from "../types";

const Menu = styled(MenuCard, {
  style: {
    marginHorizontal: 8,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    overflow: "hidden",
  }
});

const ListItem = styled(Button, {
});

export interface SelectOptionListPropsType<T> extends Omit<ViewPropsType, "children"> {
  value: T,
  children: OptionType<T>[];
  visible: boolean;
  onFocus: () => void;
}

export default function SelectOptionList<T>(props: SelectOptionListPropsType<T>) {
  const {children, value: selectedValue, visible, onFocus, ...rest} = props;
  return (
  )
}
