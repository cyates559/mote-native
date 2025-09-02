import useModuleRouter from "@/core/layouts/MoteLayout/useModuleRouter";
import {T, FigureButton, useHrefOnPress, styled, FigureButtonPropsType} from "@/core/components";
import {RouteOptionType} from "./types/RouteType";
import {ComponentType} from "react";
import {ViewProps} from "react-native";
import BackgroundScrollView from "@/core/components/View/BackgroundScrollView";

export const DefaultIndexContainer = styled(BackgroundScrollView, {
  style: {
    alignSelf: "stretch",
  },
  contentContainerStyle: {
    overflow: "hidden",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },
});

export const DefaultFigureButton = styled(FigureButton, {
});

export type RouteOptionPropsType = {
  option: RouteOptionType,
};

export function DefaultFigureButtonLink({option, ...rest}: RouteOptionPropsType & FigureButtonPropsType) {
  const {title, icon, href, hrefMode} = option;
  return (
    <DefaultFigureButton icon={icon} onPress={useHrefOnPress({href, hrefMode})} text={title} {...rest}/>
  );
}

export type DefaultIndexPropsType = ViewProps & {
  ButtonClass?: ComponentType<RouteOptionPropsType>,
  ContainerClass?: ComponentType,
}

export default function DefaultIndex({ContainerClass=DefaultIndexContainer, ButtonClass=DefaultFigureButtonLink, ...rest}: DefaultIndexPropsType) {
  const {currentOptions} = useModuleRouter();
  return (
    <ContainerClass {...rest}>
      {currentOptions.map((option, i) => typeof option === "string"?
        <T key={i}>Loading {option}</T>:
        <ButtonClass key={i} option={option}/>
      )}
    </ContainerClass>
  )
}