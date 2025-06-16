import useModuleRouter from "@/features/ModuleLayout/useModuleRouter";
import {ButtonLink, styled, T, ScrollView} from "@/components";

const Container = styled(ScrollView, {
  style: {
    flex: 1,
  },
});


export default function DefaultIndex() {
  const {currentOptions} = useModuleRouter();
  return (
    <Container>
      {currentOptions.map((option, i) => typeof option === "string"?
        <T key={i}>Loading {option}</T>:
        <ButtonLink key={i} href={option.href}>
          {option.title}
        </ButtonLink>
      )}
    </Container>
  )
}