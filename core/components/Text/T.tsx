import {useMemo} from "react";
import {styled, useTheme, StyleSheet, Text, CoreTextPropsType, ThemeKeyType} from "@/core/styled";
import {TextStyle} from "react-native";


const fonts = {
  Parkinsans: {
    weights: [300, 400, 500, 600, 700, 800],
    opticalSizes: null,
    types: null,
  },
  Inter: {
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    opticalSizes: [14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
    types: null,
  },
}

export type FontFamilyType = keyof typeof fonts;
export type FontStyleType = "Regular" | "Italic";
export type FontWeightType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type FontOpticalSizeType = 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 30 | 32;

export interface BaseTextPropsType {
  fontFamily?: FontFamilyType;
  fontStyle?: FontStyleType;
  fontWeight?: FontWeightType;
  opticalSize?: FontOpticalSizeType;
  palette?: ThemeKeyType;
}

export type TextPropsType = CoreTextPropsType & BaseTextPropsType;

export default function T(props: TextPropsType) {
  const {
    style,
    fontFamily="Parkinsans",
    fontStyle: fontType = "Regular",
    fontWeight=400,
    opticalSize=14,
    palette="color",
  } = props;
  const font = fonts[fontFamily];
  const theme = useTheme();
  const params = useMemo(() => {
    const params: (string | number)[] = [fontFamily];
    if(fontType !== "Regular" && font.types) {
      params.push(fontType);
    }
    if(font.weights) {
      params.push((fontWeight === 400 || font.weights.includes(fontWeight))? fontWeight : 400);
    }
    if(font.opticalSizes) {
      params.push((opticalSize === 14 || font.opticalSizes.includes(opticalSize))? opticalSize : 14);
    }
    return params;
  }, [fontFamily, fontType, fontWeight, opticalSize]);
  const stylesheet = useMemo(() => {
    const base: TextStyle = {
      // userSelect: "none" as any as undefined,
      fontSize: 14,
      paddingTop: 2,
      fontFamily: params.join("-"),
      color: theme[palette] as string,
    };
    const sheet = StyleSheet.flatten([base, style]);
    if(!sheet.lineHeight) {
      // For Android
      // Por Androide
      sheet.lineHeight = (sheet.fontSize?? 14) + 2;
    }
    return sheet;
  }, [params, style, theme]);
  return <Text {...props} style={stylesheet}/>
}

export const T2 = styled(T, {
  style: {
    fontSize: 12,
  },
});
