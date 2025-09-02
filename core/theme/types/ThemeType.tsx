import {TextStyle, ViewStyle} from "react-native";
import {ColorValue} from "react-native/Libraries/StyleSheet/StyleSheet";

export default interface ThemeType {
  // Main theme
  color?: ColorValue;
  style: ViewStyle & TextStyle;
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
  selectedStyle: ViewStyle & TextStyle;
  // Pressed theme
  pressedColor: ColorValue;
  pressedBackgroundColor: ColorValue; // backgroundColor
  pressedStyle: ViewStyle & TextStyle;
  // Hover theme
  hoverColor: ColorValue;
  hoverBackgroundColor: ColorValue; // backgroundColor
  hoverStyle: ViewStyle & TextStyle;

  // Accent theme
  accentColor: ColorValue; // backgroundColor or color (inverse)
  accentContrastColor: ColorValue; // color or backgroundColor (inverse)

  // Card theme
  cardColor: ColorValue; // color
  cardBackgroundColor: ColorValue; // backgroundColor
  cardStyle: ViewStyle & TextStyle; // style

  // Error theme
  errorColor: ColorValue; // backgroundColor
  errorContrastColor: ColorValue; // color

  // Input theme
  inputColor: ColorValue; // color
  inputBackgroundColor: ColorValue; // backgroundColor
  inputStyle: ViewStyle & TextStyle; // style

  // Inverse themes
  inverseButtonStyle: ViewStyle & TextStyle; // style

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
