import {ViewPropsType} from "@/core/styled";
import {H} from "../Text";
import {Row, styled} from "../View";
import {Card} from "../Card";

import FormCardFloatingButton, {FormCardFloatingButtonPropsType} from "./FormCardFloatingButton";

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
  leftButton?: FormCardFloatingButtonPropsType;
  rightButton?: FormCardFloatingButtonPropsType;
}


export default function FormCard(props: FormCardPropsType) {
  const {header, children, leftButton, rightButton, ...rest} = props;
  return (
    <Container {...rest}>
      <HeaderRow style={{alignItems: "center", justifyContent: "center", paddingHorizontal: 48}}>
        {leftButton && <FormCardFloatingButton {...leftButton} style={{start: 0}}/>}
        <H h={4} children={header}/>
        {rightButton && <FormCardFloatingButton {...rightButton} style={{end: 0}}/>}
      </HeaderRow>
      {children}
    </Container>
  );
}