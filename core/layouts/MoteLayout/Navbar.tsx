import {useEffect, useRef} from "react";
import {
  BackgroundView, BaseButtonLink, T,
  styled, View, ScrollView, NavTheme, Icon,
} from "@/core/components";
import useModuleRouter from "./useModuleRouter";

const NavbarContainer = styled(BackgroundView, {
  style: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingLeft: 4,
    gap: 4,
  },
});

const NavLink = styled(BaseButtonLink, {
  style: {
    borderRadius: 1000,
  }
});

const ScrollContainer = styled(ScrollView, {
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    gap: 4,
    paddingRight: 4,
  }
});

export default function Navbar() {
  const {breadcrumbs} = useModuleRouter();
  const ref = useRef<ScrollView>();
  const currentRef = useRef<View>();
  const l = breadcrumbs.length - 1;
  useEffect(() => currentRef.current?.measure(
    (x) => setTimeout(() => ref.current?.scrollTo({x, animated: true}))
  ), [breadcrumbs]);
  return (
    <NavTheme>
      <NavbarContainer>
        <NavLink href="/m/">
          <Icon name="House"/>
          {l === -1? undefined: <Icon name="ChevronRight"/>
          }
        </NavLink>
      <ScrollContainer forwardRef={ref}>
        {breadcrumbs.map((crumb, i) => (
          <NavLink key={i} forwardRef={i===l? currentRef: undefined} href={crumb.href}>
            <T>
              {crumb.title}
            </T>
            {i===l? undefined:
              <Icon name="ChevronRight"/>
            }
          </NavLink>
        ))}
      </ScrollContainer>
      </NavbarContainer>
    </NavTheme>
  )
}