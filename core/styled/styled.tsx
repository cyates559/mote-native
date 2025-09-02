import {ComponentType, useMemo} from "react";
import {StyleSheet} from "react-native";
import {useTheme, ThemablePropsType} from "@/core/theme";
import {StylePropsType} from "./types/StylePropsType";

export default function styled<InPropsType extends StylePropsType, DefaultPropsKeys extends keyof InPropsType>(
  InComponent: ComponentType<InPropsType>,
  allDefaultProps: ThemablePropsType<Pick<InPropsType, DefaultPropsKeys>>
) {
  // @ts-ignore
  const {style: defaultStyle, ...defaultProps} = allDefaultProps;
  const refPropKey = InComponent.hasOwnProperty("rejectRef")? "forwardRef": "ref";
  type DefaultPropsType = Pick<InPropsType, DefaultPropsKeys>;
  type RemainingPropsType = Omit<InPropsType, DefaultPropsKeys>;
  type OutPropsType = Partial<DefaultPropsType> & RemainingPropsType & {forwardRef?: any; style?: InPropsType["style"]}
  function OutComponent({style: extraStyle, forwardRef, ...props}: OutPropsType) {
    const theme = useTheme();
    const refProps = useMemo(() => forwardRef? {[refPropKey]: forwardRef}: {}, [forwardRef]);


    const flatProps = useMemo(() => Object.keys(defaultProps).reduce((results, key) => {
      // @ts-ignore
      const value = defaultProps[key];
      if(!(value instanceof Function)) {
        results[key] = value;
      }
      return results;
    }, {} as any), [defaultProps]);

    const dynamicProps = useMemo(() => Object.keys(defaultProps).reduce((results, key) => {
      // @ts-ignore
      const value = defaultProps[key];
      if(value instanceof Function) {
        results[key] = value(theme);
      }
      return results;
    }, {} as any), [theme, defaultProps]);

    const style: any = useMemo(() => (
      defaultStyle instanceof Function? defaultStyle(theme): defaultStyle
    ), [defaultStyle, theme]);

    const styleProps = useMemo(() => (style || extraStyle)? {
      style: StyleSheet.flatten([style, extraStyle])
    }: {}, [style, extraStyle]);
    return <InComponent {...flatProps} {...dynamicProps} {...props} {...refProps} {...styleProps}/>;
  }
  OutComponent.displayName = `${InComponent.displayName}.styled`;
  OutComponent.rejectRef = true;
  return OutComponent as ComponentType<OutPropsType>;
}
