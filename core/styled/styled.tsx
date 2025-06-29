import {ComponentType, useMemo} from "react";
import {StyleSheet} from "react-native";
import {useTheme, ThemablePropsType} from "@/core/theme";
import {StylePropsType} from "./types/StylePropsType";

export default function styled<InPropsType extends StylePropsType, DefaultPropsKeys extends keyof InPropsType>(
  InComponent: ComponentType<InPropsType>,
  defaultProps: ThemablePropsType<Pick<InPropsType, DefaultPropsKeys>>
) {
  const refPropKey = InComponent.hasOwnProperty("rejectRef")? "forwardRef": "ref";
  type DefaultPropsType = Pick<InPropsType, DefaultPropsKeys>;
  type RemainingPropsType = Omit<InPropsType, DefaultPropsKeys>;
  type OutPropsType = Partial<DefaultPropsType> & RemainingPropsType & {forwardRef?: any; style?: InPropsType["style"]}
  function OutComponent({style: extraStyle, forwardRef, ...props}: OutPropsType) {
    const theme = useTheme();
    const refProps = useMemo(() => forwardRef? {[refPropKey]: forwardRef}: {}, [forwardRef]);
    const {style=undefined, ...themedProps} = useMemo(() => Object.keys(defaultProps).reduce((results, key) => {
      // @ts-ignore
      const value = defaultProps[key];
      results[key] = value instanceof Function? value(theme): value;
      return results;
    }, {} as any), []);
    const styleProps = useMemo(() => (style || extraStyle)? {
      style: StyleSheet.flatten([style, extraStyle])
    }: {}, [style, extraStyle]);
    return <InComponent {...themedProps} {...props} {...refProps} {...styleProps}/>;
  }
  OutComponent.displayName = `${InComponent.displayName}.styled`;
  OutComponent.rejectRef = true;
  OutComponent.styled = <D extends keyof OutPropsType>(defaultProps: ThemablePropsType<Pick<OutPropsType, D>>) =>
    styled(OutComponent, defaultProps);
  return OutComponent;
}
