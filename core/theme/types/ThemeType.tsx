import {TextStyle, ViewStyle} from "react-native";
import {ColorValue} from "react-native/Libraries/StyleSheet/StyleSheet";
import {type FontFamilyType} from "@/core/components/Text/T";

export type MixedStyleType = ViewStyle & Omit<TextStyle, "boxShadow">;

export default interface ThemeType {
  // Main theme
  color?: ColorValue;
  style: MixedStyleType;
  textStyle: TextStyle;
  fontFamily: FontFamilyType;
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  
  // Just for spinner
  spinnerColor: ColorValue;

  /// FLAGS
  // Secondary
  secondaryColor: ColorValue; // color
  // Selection theme
  selectedColor: ColorValue;
  selectedBackgroundColor: ColorValue; // backgroundColor
  selectedStyle: MixedStyleType;
  // Pressed theme
  pressedColor: ColorValue;
  pressedBackgroundColor: ColorValue; // backgroundColor
  pressedStyle: MixedStyleType;
  // Hover theme
  hoverColor: ColorValue;
  hoverBackgroundColor: ColorValue; // backgroundColor
  hoverStyle: MixedStyleType;

  // Accent theme
  accentColor: ColorValue; // backgroundColor or color (inverse)
  accentContrastColor: ColorValue; // color or backgroundColor (inverse)

  // Card theme
  cardColor: ColorValue; // color
  cardBackgroundColor: ColorValue; // backgroundColor
  cardStyle: MixedStyleType; // style

  // Menu theme
  menuColor: ColorValue; // color
  menuBackgroundColor: ColorValue; // backgroundColor
  menuStyle: MixedStyleType; // style

  // Error theme
  errorColor: ColorValue; // backgroundColor
  errorContrastColor: ColorValue; // color

  // Input theme
  inputColor: ColorValue; // color
  inputBackgroundColor: ColorValue; // backgroundColor
  inputStyle: MixedStyleType; // style

  // Inverse themes
  inverseButtonStyle: MixedStyleType; // style

  // Nav theme
  navColor: ColorValue; // color
  navBackgroundColor: ColorValue; // backgroundColor

  // Sidebar theme
  sidebarColor: ColorValue; // color
  sidebarBackgroundColor: ColorValue; // backgroundColor

  // Spicy theme
  spicyColor: ColorValue; // backgroundColor or color (inverse)
  spicyContrastColor: ColorValue; // color or backgroundColor (inverse)
}
