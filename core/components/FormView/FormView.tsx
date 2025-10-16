import {styled, View, ViewStyleType} from "../View";
import {FormFieldGroups, FormFieldGroupsPropsType} from "../Form";

export type FormViewPropsType = FormFieldGroupsPropsType & {pairStyle?: ViewStyleType};

const Container = styled(View, {
  style: {
    gap: 8,
  },
});

const DefaultFieldGroups = styled(FormFieldGroups, {
  style: {
    gap: 2,
  },
});

export default function FormView(props: FormViewPropsType) {
  const {pairStyle, labelStyle, rightStyle, children, ...rest} = props;
  return (
    <Container {...rest}>
      <DefaultFieldGroups style={pairStyle} leftStyle={labelStyle} rightStyle={rightStyle} children={children}/>
    </Container>
  )
}