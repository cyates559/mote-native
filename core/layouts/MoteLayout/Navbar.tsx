import {useCallback, useEffect, useRef} from "react";
import {
  BackgroundView, ButtonLink, T,
  styled, View, ScrollView, Themes, Icon,
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

const NavLink = styled(ButtonLink, {
  style: {
    borderRadius: 1000,
  }
});

const ScrollContainer = styled(ScrollView, {
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 4,
  }
});

export default function Navbar() {
  const {breadcrumbs} = useModuleRouter();
  const ref = useRef<ScrollView>();
  const currentRef = useRef<View>();
  const l = breadcrumbs.length - 1;
  const animator = useRef<number>(0);
  const onUpdate = useCallback(() => {
    window.clearTimeout(animator.current);
    return currentRef.current?.measure(
      (x) => {
        animator.current = window.setTimeout(() => ref.current?.scrollTo({x, animated: true}));
      }
    );
  }, [breadcrumbs]);
  useEffect(onUpdate, [onUpdate]);
  return (
    <Themes.Nav>
      <NavbarContainer>
        <NavLink href="/m/">
          <Icon name="House"/>
          {l === -1? undefined: <Icon name="ChevronRight"/>}
        </NavLink>
      <ScrollContainer forwardRef={ref} onLayout={onUpdate}>
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
    </Themes.Nav>
  )
}