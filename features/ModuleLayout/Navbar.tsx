import {styled, BackgroundView, ScrollView, ButtonLink, Icon, NavTheme} from "@/components";
import useModuleRouter from "@/features/ModuleLayout/useModuleRouter";
import {useRef} from "react";

const NavbarContainer = BackgroundView.styled({
  style: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingLeft: 4,
    gap: 4,
  },
});

const ScrollContainer = styled(ScrollView, {
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  style: {
  },
  contentContainerStyle: {
    gap: 4,
    paddingRight: 4,
  }
});

export default function Navbar() {
  const {breadcrumbs} = useModuleRouter();
  const ref = useRef<ScrollView>();
  return (
    <NavTheme>
      <NavbarContainer>
        <ButtonLink href="/m/">
          <Icon name="House"/>
        </ButtonLink>
      <ScrollContainer forwardRef={ref} onLayout={() => ref.current?.scrollToEnd()}>
        {breadcrumbs.map((crumb, i) => (
          <ButtonLink key={i} href={crumb.href}>
            {crumb.title}
          </ButtonLink>
        ))}
      </ScrollContainer>
      </NavbarContainer>
    </NavTheme>
  )
}