import {styled} from "@/core/styled";
import {Icon, IconNameType} from "../Icon";
import {Button, ButtonPropsType} from "../Button";


const FloatingButtonComponent = styled(Button, {
  compact: true,
  style: {
    borderRadius: "100vh",
    padding: 5,
    position: "absolute",
  }
});

export type FloatingButtonPropsType = {icon: IconNameType} & Omit<ButtonPropsType, "children">;

export default function FloatingButton(props: FloatingButtonPropsType) {
  const {icon, ...rest} = props;
  return <FloatingButtonComponent {...rest} children={<Icon name={icon}/>}/>
}
