import {icons, LucideProps} from "lucide-react-native";
import {ThemeKeyType, useTheme} from "@/core/theme";

export type IconNameType = keyof typeof icons;
export type IconNamePropsType = {name: IconNameType};
export type IconPropsType = LucideProps & {palette?: ThemeKeyType;};
export type GenericIconPropsType = IconNamePropsType & IconPropsType;

export default function Icon({name, color, palette="color", ...props}: GenericIconPropsType) {
  const defaultColor: string = useTheme()[palette] as string;
  const Class = icons[name]?? icons.FileQuestion;
  return <Class color={color?? defaultColor} {...props}/>
}