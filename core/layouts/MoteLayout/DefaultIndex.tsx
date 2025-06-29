import useModuleRouter from "@/core/layouts/MoteLayout/useModuleRouter";
import {T, FigureButton, useHrefOnPress, styled, ScrollView} from "@/core/components";
import {RouteOptionType} from "./types/RouteType";

const Container = styled(ScrollView, {
  style: {
    flex: 1,
  },
  contentContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },
});

export function DefaultFigureButton({option: {title, icon, href, hrefMode}}: {option: RouteOptionType}) {
  return (
    <FigureButton accent filled icon={icon} onPress={useHrefOnPress({href, hrefMode})} text={title}/>
  );
}

export default function DefaultIndex() {
  const {currentOptions} = useModuleRouter();
  return (
    <Container>
      {currentOptions.map((option, i) => typeof option === "string"?
        <T key={i}>Loading {option}</T>:
        <DefaultFigureButton key={i} option={option}/>
      )}
    </Container>
  )
}