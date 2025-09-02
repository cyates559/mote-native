import {Dispatch, SetStateAction, useCallback} from "react";
import Button, {ButtonPropsType} from "../Button/Button";
import {Icon, IconNameType} from "../Icon";
import {T} from "../Text";

export type CheckboxPropsType = Omit<ButtonPropsType, "onPress"> & {
  value: boolean | null;
  setValue: Dispatch<SetStateAction<boolean | null>>
  baseIcon?: IconNameType;
  checkedIcon?: IconNameType;
}

export default function Checkbox(props: CheckboxPropsType) {
  const {value, setValue, baseIcon, checkedIcon, children, ...rest} = props;
  const toggle = useCallback(() => setValue(oldVal => !oldVal), [setValue])
  return (
    <Button {...rest} onPress={toggle} selected={!!value}>
      <Icon name={baseIcon?? "Square"}>
      </Icon>
      {value &&
        <Icon name={checkedIcon?? "Check"} size={16} style={{marginLeft: -21, marginRight: 1,}}/>
      }
      <T>
        {children}
      </T>
    </Button>
  )
}
