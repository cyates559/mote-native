import {ReactNode, useCallback, useMemo} from "react";
import {styled, View, ViewPropsType, Row} from "@/core/components/View";
import useFormView from "./useFormView";
import {ViewStyleType, StyleSheet, LayoutChangeEventType} from "@/core/styled";

export interface FormViewPropsType extends ViewPropsType {
  children: ReactNode[];
  outerStyle?: ViewStyleType;
  rowStyle?: ViewStyleType;
  leftStyle?: ViewStyleType;
  rightStyle?: ViewStyleType;
}

const Container = styled(View, {
  style: {
    flexGrow: 1,
  },
});

const SizeController = styled(View, {
  style: {
    gap: 10,
    flex: 1,
  },
});

const Cell = styled(Row, {
  style: {
    overflowX: "hidden",
  },
});

const InnerCell = styled(View, {
  style: {
    paddingHorizontal: 6,
    paddingBottom: 3,
  },
})

type CellSizerPropsType = {index: number, onWidthChange: (index: number, width: number) => void} & ViewPropsType;

function CellSizer({onWidthChange, index, ...rest}: CellSizerPropsType) {
  const onLayout = useCallback((e: LayoutChangeEventType) => {
    const {nativeEvent: {layout: {width}}} = e;
    onWidthChange(index, width);
  }, [index, onWidthChange]);
  return (
    <InnerCell onLayout={onLayout} {...rest}/>
  );
}

export default function FormView(props: FormViewPropsType) {
  const {children, outerStyle, rowStyle, leftStyle, rightStyle, ...rest} = props;
  const controller = useFormView(children);
  const outerStyleSheet: ViewStyleType = useMemo(() => StyleSheet.flatten([outerStyle, {
    flexBasis: controller.containerWidth
  }]), [outerStyle, controller.containerWidth]);
  const rowStyleSheet: ViewStyleType = useMemo(() => StyleSheet.flatten([rowStyle, {
    flexDirection: controller.isWrapped? "column": "row",
    justifyContent: "center",
  }]), [controller.isWrapped, rowStyle]);
  const leftStyleSheet: ViewStyleType = useMemo(() => StyleSheet.flatten([leftStyle, {
    width: controller.leftWidth,
    justifyContent: controller.isWrapped? undefined: "flex-end",
  }]), [leftStyle, controller.leftWidth, controller.isWrapped]);
  const rightStyleSheet: ViewStyleType = useMemo(() => StyleSheet.flatten([rightStyle, {
    width: controller.rightWidth,
  }]), [rightStyle, controller.rightWidth]);
  return (
    <Container style={outerStyleSheet}>
      <SizeController {...rest} onLayout={controller.onLayout}>
        {controller.childPairs.map(([left, right], i) =>
          <Row key={i} style={rowStyleSheet}>
            <Cell style={leftStyleSheet}>
              <CellSizer index={i} onWidthChange={controller.onLeftWidthChange} children={left}/>
            </Cell>
            <Cell style={rightStyleSheet}>
              <CellSizer index={i} onWidthChange={controller.onRightWidthChange} children={right}/>
            </Cell>
          </Row>
        )}
      </SizeController>
    </Container>
  );
}