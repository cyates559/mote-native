export {
  SafeAreaView,
  StyleSheet,
  View, ViewProps as ViewPropsType, ViewStyle as ViewStyleType,
  ScrollView, ScrollViewProps,
  Text, TextProps as CoreTextPropsType, TextStyle as TextStyleType,
  TextInput as CoreTextInput, TextInputProps as CoreTextInputPropsType,
  Pressable, PressableProps as PressablePropsType,
  Image, ImageProps as ImagePropsType,
  ImageBackground, ImageBackgroundProps as ImageBackgroundPropsType,
  ActivityIndicator, ActivityIndicatorProps as ActivityIndicatorPropsType,
  LayoutChangeEvent as LayoutChangeEventType,
} from "react-native";

export * from "@/core/theme";

export {default as styled} from "./styled"
export {StylePropsType} from "./types/StylePropsType";
