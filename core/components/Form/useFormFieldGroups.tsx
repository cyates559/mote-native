import {ReactNode, useMemo} from "react";

export default function useFormFieldGroups(children: ReactNode[]) {
  return useMemo(() => {
    const result: [ReactNode, ReactNode, ReactNode][] = [];
    for (let i = 0, j = 1, k = 2; i < children.length; i += 3, j += 3, k += 3) {
      if(k >= children.length) {
        // The final component can have no label
        result.push([null, children[i], children[j]]);
      } else {
        result.push([children[i], children[j], children[k]]);
      }
    }
    return result;
  }, [children])
}

// export default function useFormFieldGroups(children: ReactNode[]): FormViewControllerType {
//   const [leftWidths, setLeftWidths] = useState<number[]>([]);
//   const [rightWidths, setRightWidths] = useState<number[]>([]);
//   const [fullWidth, setFullWidth] = useState<number>(0);
//   const childPairs = useMemo(() => {
//     const result: [ReactNode | undefined, ReactNode][] = [];
//     for (let i = 0, j = 1; i < children.length; i += 2, j += 2) {
//       if(j === children.length) {
//         // The final component can have no label
//         result.push([null, children[i]]);
//       } else {
//         result.push([children[i], children[j]]);
//       }
//     }
//     return result;
//   }, [children]);
//   const leftOnResize = useCallback((i: number, w: number, h: number) => setLeftWidths(widths => {
//     const newWidths = [...widths];
//     newWidths[i] = w + 1;
//     return newWidths;
//   }), [setLeftWidths]);
//   const rightOnResize = useCallback((i: number, w: number, h: number) => setRightWidths(widths => {
//     const newWidths = [...widths];
//     newWidths[i] = w + 1;
//     return newWidths;
//   }), [setRightWidths]);
//   const leftWidth = useMemo(() => Math.max(0, ...leftWidths), [leftWidths]);
//   const rightWidth = useMemo(() => Math.max(0, ...rightWidths), [rightWidths]);
//   const onLayout = useCallback((e: LayoutChangeEvent) => {
//     const {nativeEvent: {layout: {width}}} = e;
//     setFullWidth(width);
//   }, [setFullWidth]);
//   const isWrapped = fullWidth <= (rightWidth + leftWidth);
//   return {
//     containerWidth: isWrapped? Math.max(rightWidth, leftWidth): leftWidth + rightWidth,
//     childPairs, onLayout, isWrapped, leftWidth, rightWidth, onLeftSizeChange: leftOnResize, onRightSizeChange: rightOnResize,
//   }
// }
