import {Svg, Path, Circle, SvgProps} from "react-native-svg";
import {useTheme} from "@/core/theme";

export interface MoteLogoPropsType {
  size?: number;
}

export default function MoteLogo({size=160}: MoteLogoPropsType) {
  const {selectionColor, accentColor, secondaryAccentColor: foreground} = useTheme();
  const props: SvgProps = {
    width: size, height: size,
    viewBox: "0 0 64 64",
    stroke: selectionColor, fill: selectionColor,
    strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round",
  }
  return (
    <Svg {...props}>
      <Circle cx="32" cy="32" r="32" fill={accentColor} strokeWidth="0"/>
      <Path d="M 15,31 H 7 L 32,8 57,31 H 49 V 54 H 39 V 38 H 25 V 54 H 15 Z" stroke={foreground} fill={foreground}/>
      <Path d="M16 28 a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"/>
      <Path d="M24 57 a8 8 0 0 1 8 -8a8 8 0 0 1 -8 -8a8 8 0 0 1 -8 8a8 8 0 0 1 8 8z"/>
      <Path d="M46 36 a11 11 0 0 1 11 -11a11 11 0 0 1 -11 -11a11 11 0 0 1 -11 11a11 11 0 0 1 11 11z"/>
    </Svg>
  )
}