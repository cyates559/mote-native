import {StyleProp} from "react-native";

export interface StylePropsType<Component=any> {
  style?: StyleProp<Component> | null;
}
