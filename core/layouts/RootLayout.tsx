import {StatusBar} from "react-native";
import { Slot } from "expo-router";
import {useFonts} from "expo-font";
import {Loading, T, useTheme} from "@/core/components";


export default function RootLayout() {
  const [loaded, error] = useFonts(fontMap);
  const theme = useTheme();
  if(!loaded) {
    return <Loading
      header="Loading Fonts..."
      text="Don't hold your breath"
    />
  }
  if(error) {
    return <T palette="errorColor" children="Could not load fonts..."/>;
    // return (
    //   <ErrorText>
    //     {error.message}
    //   </ErrorText>
    // );
  }
  return <>
    <StatusBar backgroundColor={theme.spicyColor} barStyle="light-content"/>
    <Slot/>
  </>;
}

const fontMap = {
  "Parkinsans-300": require("../../assets/fonts/Parkinsans/Parkinsans-300.ttf"),
  "Parkinsans-400": require("../../assets/fonts/Parkinsans/Parkinsans-400.ttf"),
  "Parkinsans-500": require("../../assets/fonts/Parkinsans/Parkinsans-500.ttf"),
  "Parkinsans-600": require("../../assets/fonts/Parkinsans/Parkinsans-600.ttf"),
  "Parkinsans-700": require("../../assets/fonts/Parkinsans/Parkinsans-700.ttf"),
  "Parkinsans-800": require("../../assets/fonts/Parkinsans/Parkinsans-800.ttf"),
  "Inter-100-14": require("../../assets/fonts/Inter/Inter-100-14.ttf"),
  "Inter-100-16": require("../../assets/fonts/Inter/Inter-100-16.ttf"),
  "Inter-100-18": require("../../assets/fonts/Inter/Inter-100-18.ttf"),
  "Inter-100-20": require("../../assets/fonts/Inter/Inter-100-20.ttf"),
  "Inter-100-22": require("../../assets/fonts/Inter/Inter-100-22.ttf"),
  "Inter-100-24": require("../../assets/fonts/Inter/Inter-100-24.ttf"),
  "Inter-100-26": require("../../assets/fonts/Inter/Inter-100-26.ttf"),
  "Inter-100-28": require("../../assets/fonts/Inter/Inter-100-28.ttf"),
  "Inter-100-30": require("../../assets/fonts/Inter/Inter-100-30.ttf"),
  "Inter-100-32": require("../../assets/fonts/Inter/Inter-100-32.ttf"),
  "Inter-200-14": require("../../assets/fonts/Inter/Inter-200-14.ttf"),
  "Inter-200-16": require("../../assets/fonts/Inter/Inter-200-16.ttf"),
  "Inter-200-18": require("../../assets/fonts/Inter/Inter-200-18.ttf"),
  "Inter-200-20": require("../../assets/fonts/Inter/Inter-200-20.ttf"),
  "Inter-200-22": require("../../assets/fonts/Inter/Inter-200-22.ttf"),
  "Inter-200-24": require("../../assets/fonts/Inter/Inter-200-24.ttf"),
  "Inter-200-26": require("../../assets/fonts/Inter/Inter-200-26.ttf"),
  "Inter-200-28": require("../../assets/fonts/Inter/Inter-200-28.ttf"),
  "Inter-200-30": require("../../assets/fonts/Inter/Inter-200-30.ttf"),
  "Inter-200-32": require("../../assets/fonts/Inter/Inter-200-32.ttf"),
  "Inter-300-14": require("../../assets/fonts/Inter/Inter-300-14.ttf"),
  "Inter-300-16": require("../../assets/fonts/Inter/Inter-300-16.ttf"),
  "Inter-300-18": require("../../assets/fonts/Inter/Inter-300-18.ttf"),
  "Inter-300-20": require("../../assets/fonts/Inter/Inter-300-20.ttf"),
  "Inter-300-22": require("../../assets/fonts/Inter/Inter-300-22.ttf"),
  "Inter-300-24": require("../../assets/fonts/Inter/Inter-300-24.ttf"),
  "Inter-300-26": require("../../assets/fonts/Inter/Inter-300-26.ttf"),
  "Inter-300-28": require("../../assets/fonts/Inter/Inter-300-28.ttf"),
  "Inter-300-30": require("../../assets/fonts/Inter/Inter-300-30.ttf"),
  "Inter-300-32": require("../../assets/fonts/Inter/Inter-300-32.ttf"),
  "Inter-400-14": require("../../assets/fonts/Inter/Inter-400-14.ttf"),
  "Inter-400-16": require("../../assets/fonts/Inter/Inter-400-16.ttf"),
  "Inter-400-18": require("../../assets/fonts/Inter/Inter-400-18.ttf"),
  "Inter-400-20": require("../../assets/fonts/Inter/Inter-400-20.ttf"),
  "Inter-400-22": require("../../assets/fonts/Inter/Inter-400-22.ttf"),
  "Inter-400-24": require("../../assets/fonts/Inter/Inter-400-24.ttf"),
  "Inter-400-26": require("../../assets/fonts/Inter/Inter-400-26.ttf"),
  "Inter-400-28": require("../../assets/fonts/Inter/Inter-400-28.ttf"),
  "Inter-400-30": require("../../assets/fonts/Inter/Inter-400-30.ttf"),
  "Inter-400-32": require("../../assets/fonts/Inter/Inter-400-32.ttf"),
  "Inter-500-14": require("../../assets/fonts/Inter/Inter-500-14.ttf"),
  "Inter-500-16": require("../../assets/fonts/Inter/Inter-500-16.ttf"),
  "Inter-500-18": require("../../assets/fonts/Inter/Inter-500-18.ttf"),
  "Inter-500-20": require("../../assets/fonts/Inter/Inter-500-20.ttf"),
  "Inter-500-22": require("../../assets/fonts/Inter/Inter-500-22.ttf"),
  "Inter-500-24": require("../../assets/fonts/Inter/Inter-500-24.ttf"),
  "Inter-500-26": require("../../assets/fonts/Inter/Inter-500-26.ttf"),
  "Inter-500-28": require("../../assets/fonts/Inter/Inter-500-28.ttf"),
  "Inter-500-30": require("../../assets/fonts/Inter/Inter-500-30.ttf"),
  "Inter-500-32": require("../../assets/fonts/Inter/Inter-500-32.ttf"),
  "Inter-600-14": require("../../assets/fonts/Inter/Inter-600-14.ttf"),
  "Inter-600-16": require("../../assets/fonts/Inter/Inter-600-16.ttf"),
  "Inter-600-18": require("../../assets/fonts/Inter/Inter-600-18.ttf"),
  "Inter-600-20": require("../../assets/fonts/Inter/Inter-600-20.ttf"),
  "Inter-600-22": require("../../assets/fonts/Inter/Inter-600-22.ttf"),
  "Inter-600-24": require("../../assets/fonts/Inter/Inter-600-24.ttf"),
  "Inter-600-26": require("../../assets/fonts/Inter/Inter-600-26.ttf"),
  "Inter-600-28": require("../../assets/fonts/Inter/Inter-600-28.ttf"),
  "Inter-600-30": require("../../assets/fonts/Inter/Inter-600-30.ttf"),
  "Inter-600-32": require("../../assets/fonts/Inter/Inter-600-32.ttf"),
  "Inter-700-14": require("../../assets/fonts/Inter/Inter-700-14.ttf"),
  "Inter-700-16": require("../../assets/fonts/Inter/Inter-700-16.ttf"),
  "Inter-700-18": require("../../assets/fonts/Inter/Inter-700-18.ttf"),
  "Inter-700-20": require("../../assets/fonts/Inter/Inter-700-20.ttf"),
  "Inter-700-22": require("../../assets/fonts/Inter/Inter-700-22.ttf"),
  "Inter-700-24": require("../../assets/fonts/Inter/Inter-700-24.ttf"),
  "Inter-700-26": require("../../assets/fonts/Inter/Inter-700-26.ttf"),
  "Inter-700-28": require("../../assets/fonts/Inter/Inter-700-28.ttf"),
  "Inter-700-30": require("../../assets/fonts/Inter/Inter-700-30.ttf"),
  "Inter-700-32": require("../../assets/fonts/Inter/Inter-700-32.ttf"),
  "Inter-800-14": require("../../assets/fonts/Inter/Inter-800-14.ttf"),
  "Inter-800-16": require("../../assets/fonts/Inter/Inter-800-16.ttf"),
  "Inter-800-18": require("../../assets/fonts/Inter/Inter-800-18.ttf"),
  "Inter-800-20": require("../../assets/fonts/Inter/Inter-800-20.ttf"),
  "Inter-800-22": require("../../assets/fonts/Inter/Inter-800-22.ttf"),
  "Inter-800-24": require("../../assets/fonts/Inter/Inter-800-24.ttf"),
  "Inter-800-26": require("../../assets/fonts/Inter/Inter-800-26.ttf"),
  "Inter-800-28": require("../../assets/fonts/Inter/Inter-800-28.ttf"),
  "Inter-800-30": require("../../assets/fonts/Inter/Inter-800-30.ttf"),
  "Inter-800-32": require("../../assets/fonts/Inter/Inter-800-32.ttf"),
  "Inter-900-14": require("../../assets/fonts/Inter/Inter-900-14.ttf"),
  "Inter-900-16": require("../../assets/fonts/Inter/Inter-900-16.ttf"),
  "Inter-900-18": require("../../assets/fonts/Inter/Inter-900-18.ttf"),
  "Inter-900-20": require("../../assets/fonts/Inter/Inter-900-20.ttf"),
  "Inter-900-22": require("../../assets/fonts/Inter/Inter-900-22.ttf"),
  "Inter-900-24": require("../../assets/fonts/Inter/Inter-900-24.ttf"),
  "Inter-900-26": require("../../assets/fonts/Inter/Inter-900-26.ttf"),
  "Inter-900-28": require("../../assets/fonts/Inter/Inter-900-28.ttf"),
  "Inter-900-30": require("../../assets/fonts/Inter/Inter-900-30.ttf"),
  "Inter-900-32": require("../../assets/fonts/Inter/Inter-900-32.ttf"),
};
