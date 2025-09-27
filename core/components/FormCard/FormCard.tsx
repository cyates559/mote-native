import {ViewPropsType} from "@/core/styled";
import {H} from "../Text";
import {Row, styled} from "../View";
import {Card} from "../Card";

import FloatingButton, {FloatingButtonPropsType} from "./FloatingButton";

const Container = styled(Card, {
  style: {
    padding: 16,
    gap: 8,
    flexGrow: 1,
  }
});


const HeaderRow = styled(Row, {
  style: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 48,
  },
});


export interface FormCardPropsType extends ViewPropsType {
  header: string;
  leftButton?: FloatingButtonPropsType;
  rightButton?: FloatingButtonPropsType;
}


export default function FormCard(props: FormCardPropsType) {
  const {header, children, leftButton, rightButton, ...rest} = props;
  return (
    <Container {...rest}>
      <HeaderRow style={{alignItems: "center", justifyContent: "center", paddingHorizontal: 48}}>
        {leftButton && <FloatingButton {...leftButton}/>}
        <H h={4} children={header}/>
        {rightButton && <FloatingButton {...rightButton} style={{end: 0}}/>}
      </HeaderRow>
      {children}
    </Container>
  );
}