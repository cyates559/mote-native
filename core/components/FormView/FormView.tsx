import {styled, View, ViewStyleType} from "../View";
import {FormPairs, FormPairsPropsType} from "../Form";

export type FormViewPropsType = FormPairsPropsType & {pairStyle?: ViewStyleType};

const Container = styled(View, {
  style: {
    gap: 8,
  },
});

const DefaultFormPairs = styled(FormPairs, {
  style: {
    gap: 2,
  },
});

export default function FormView(props: FormViewPropsType) {
  const {pairStyle, leftStyle, rightStyle, children, ...rest} = props;
  return (
    <Container {...rest}>
      <DefaultFormPairs style={pairStyle} leftStyle={leftStyle} rightStyle={rightStyle} children={children}/>
    </Container>
  )
}