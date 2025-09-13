import {useMemo} from "react";
import {styled, useTheme, StyleSheet, Text, CoreTextPropsType, ThemeKeyType} from "@/core/styled";


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
  const theme = useTheme();
  const {
    style,
    fontFamily=theme.fontFamily,
    fontStyle: fontType = "Regular",
    fontWeight=400,
    opticalSize=14,
    palette="color",
  } = props;
  const font = fonts[fontFamily];
  const fontParams = useMemo(() => {
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
    const sheet = StyleSheet.flatten([theme.textStyle, {
      fontFamily: fontParams.join("-"),
      color: theme[palette] as string,
    }, style]);
    if(!sheet.lineHeight) {
      // For Android
      // Por Androide
      sheet.lineHeight = (sheet.fontSize?? 14) + 2;
    }
    return sheet;
  }, [fontParams, style, theme]);
  return <Text {...props} style={stylesheet}/>
}

export const T2 = styled(T, {
  style: {
    fontSize: 12,
  },
});
