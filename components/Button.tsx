import {useMemo} from "react";
import {useTheme, StyleSheet} from "@/styled";
import ButtonStylePropsType from "@/components/types/ButtonStylePropsType";
import BaseButton, { BaseButtonPropsType } from "./BaseButton";

export interface ButtonPropsType extends ButtonStylePropsType, BaseButtonPropsType {}

export default function Button(props: ButtonPropsType) {
  const {accent, secondary, bad, filled, pill, style, ...rest} = props;
  const theme = useTheme();
  const [sheet, foreground] = useMemo(() => {
    let spice = theme.secondaryColor;
    if(bad) {
      spice = theme.badColor;
    } else if(secondary) {
      spice = theme.secondaryAccentColor;
    } else if(accent) {
      spice = theme.accentColor;
    }
    const sheet = StyleSheet.flatten([{
      backgroundColor: filled? spice: "transparent",
      borderColor: filled? undefined: spice,
      borderWidth: filled? 0 : 1,
      borderRadius: pill? 24: 6,
    }, style]);
    return [sheet, filled? theme.accentContrastColor: spice];
  }, [style, accent, secondary, bad, filled, pill, pill]);
  return (
    <BaseButton foreground={foreground} {...rest} style={sheet}/>
  );
}