import type ThemeType from "./types/ThemeType";

const defaultTheme: ThemeType = {
  // Main theme
  color: "black",
  style: {},
  textStyle: {
    // userSelect: "none" as any as undefined,
    fontSize: 14,
    paddingTop: 2,
  },
  fontFamily: "Parkinsans",
  backgroundColor: "lightgray",
  borderColor: "#aaaaaa",
  spinnerColor: "#33002a",

  /// FLAGS
  // Secondary theme
  secondaryColor: "lightgray", // color
  // Selection theme
  selectedColor: "#33002a",
  selectedBackgroundColor: "#ffc600", // backgroundColor
  selectedStyle: {},
  // Pressed theme
  pressedColor: "white",
  pressedBackgroundColor: "#999999", // backgroundColor
  pressedStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
  // Hover theme
  hoverColor: "white",
  hoverBackgroundColor: "#777777", // backgroundColor
  hoverStyle: {},

  // Accent theme
  accentColor: "#9b5c8d", // backgroundColor or color (inverse)
  accentContrastColor: "white", // color or backgroundColor (inverse)

  // Card theme
  cardColor: "#331233", // color
  cardBackgroundColor: "#F2F2F2", // backgroundColor
  cardStyle: {
    borderRadius: 8,
    // borderWidth: 1,
    shadowColor: "#ffc600",
    shadowOffset: { width: 1, height: 2, },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
  }, // style

  // Error theme
  errorColor: "red", // backgroundColor
  errorContrastColor: "white", // color

  // Input theme
  inputColor: "black", // color
  inputBackgroundColor: "white", // backgroundColor
  inputStyle: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  // Inverse themes
  inverseButtonStyle: {
    borderWidth: 1,
  },

  // Nav theme
  navColor: "white", // color
  navBackgroundColor: "#33002a", // backgroundColor

  // Sidebar theme
  sidebarColor: "white", // color
  sidebarBackgroundColor: "#33002a", // backgroundColor

  // Spicy theme
  spicyColor: "#33002a", // backgroundColor or color (inverse)
  spicyContrastColor: "white", // color or backgroundColor (inverse)
}

export default defaultTheme;
