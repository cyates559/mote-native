import {Button, ButtonPropsType, Icon, IconNameType, styled} from "@/core";


const FloatingButtonComponent = styled(Button, {
  compact: true,
  style: {
    position: "absolute",
  }
});

export type FloatingButtonPropsType = {icon: IconNameType} & Omit<ButtonPropsType, "children">;

export default function FloatingButton(props: FloatingButtonPropsType) {
  const {icon, ...rest} = props;
  return <FloatingButtonComponent {...rest} children={<Icon name={icon}/>}/>
}
