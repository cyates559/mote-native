import createTheme from "@/core/theme/createTheme";

const InverseAccentTheme = createTheme("InverseAccent", {
  color: "accentColor",
  borderColor: "accentColor",
  backgroundColor: "accentContrastColor",
  style: "inverseButtonStyle",
});

export default InverseAccentTheme;
