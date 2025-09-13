import {ReactNode} from "react";
import {styled, View, ViewPropsType, Row} from "@/core/components/View";
import useFormView from "./useFormView";
import {ViewStyleType} from "@/core/styled";

export interface FormViewPropsType extends ViewPropsType {
  children: ReactNode[];
  pairStyle?: ViewStyleType;
  leftStyle?: ViewStyleType;
  rightStyle?: ViewStyleType;
}

const Container = styled(View, {
  style: {
    gap: 8,
  },
});

const Pair = styled(View, {
  style: {
    gap: 2,
  },
});

const Cell = styled(View, {
  style: {
  },
});

export default function FormView(props: FormViewPropsType) {
  const {children, pairStyle, leftStyle, rightStyle, ...rest} = props;
  return (
    <Container {...rest}>
      {useFormView(children).map(([left, right], i) =>
        <Pair key={i} style={pairStyle}>
          <Cell style={leftStyle} children={left}/>
          <Cell style={rightStyle} children={right}/>
        </Pair>
      )}
    </Container>
  );
}