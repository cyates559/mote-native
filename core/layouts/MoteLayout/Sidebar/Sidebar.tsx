import {useCallback, useEffect, useMemo, useState} from "react";
import {Dimensions, LayoutChangeEvent} from "react-native";
import {T, BackgroundView, ButtonLink, Icon, styled, View, ScrollView, Spinner, Themes} from "@/core/components";
import useModuleRouter from "../useModuleRouter";


const SidebarPadding = styled(BackgroundView, {
  style: {
    alignSelf: "stretch",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
});

const SidebarContainer = styled(ScrollView, {
  horizontal: true,
  scrollEnabled: false,
  style: {
  },
  contentContainerStyle: {

  },
});

const SidebarColumn = styled(ScrollView, {
  style: {
    flexBasis: "auto",
    flexShrink: 0,
    flexGrow: 0,
    overflowX: "hidden",
  },
});

const InnerColumn = styled(View, {
  style: {
    padding: 4,
    gap: 6,
    flexBasis: "auto",
    overflowX: "hidden",
  }
})

const SidebarLink = styled(ButtonLink, {
  style: {
    justifyContent: "flex-start",
    borderRadius: 1000,
  }
});

const SidebarLinkText = styled(T, {
  style: {
    flexGrow: 1,
  }
});

const sidebarPercentage = 0.3;

export default function Sidebar() {
  const {route, routeOptions} = useModuleRouter();
  const [sizes, setSizes] = useState<number[]>([]);
  const [pageWidth, setPageWidth] = useState<number>(Dimensions.get("window").width);
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window: {width}}) => setPageWidth(width));
    return () => subscription?.remove();
  }, [setPageWidth]);
  const onLayout = useCallback((i: number, event: LayoutChangeEvent) => {
    // you have to grab the width immediately
    const newWidth = event.nativeEvent.layout.width;
    setSizes(prev => {
      const sizes = prev.slice(0, routeOptions.length - 1);
      sizes[i] = newWidth;
      return sizes;
    });
  }, [routeOptions.length, setSizes]);
  const columnCount = routeOptions.length - 1;
  useEffect(() => setSizes(prev => prev.length === columnCount? prev: prev.slice(0, columnCount)), [columnCount])
  const [width, count] = useMemo(() => {
    let total = 0;
    let count = 0;
    const max = pageWidth * sidebarPercentage;
    for (const size of sizes) {
      const newTotal = total + size;
      if(newTotal > max) {
        return [total, count];
      }
      count++;
      total = newTotal;
    }
    return [total, count];
  }, [pageWidth, sizes]);
  const currentSizeStyle = useMemo(() => ({width}), [width]);
  return (
    <Themes.Sidebar>
      <SidebarPadding style={width === 0? {paddingHorizontal: 0}: undefined}>
        <SidebarContainer style={currentSizeStyle}>
          {routeOptions.slice(0, -1).map((options, i) => {
            const focusable = i < count;
            return (
              <SidebarColumn key={i}>
                <InnerColumn onLayout={(event) => onLayout(i, event)}>
                  {options.map((option, j) => {
                    if (typeof option === "string") {
                      return <Spinner key={j} children={option}/>;
                    } else {
                      const {nodeId, href, hrefMode, title, icon} = option;
                      const selected = nodeId === route[i + 1];
                      return (
                        <SidebarLink focusable={focusable} tabIndex={focusable? undefined: -1} key={nodeId} href={href} hrefMode={hrefMode} selected={selected}>
                          <Icon name={icon}/>
                          <SidebarLinkText children={title}/>
                          <Icon name="ChevronRight" style={selected ? {} : {opacity: 0}}/>
                        </SidebarLink>
                      );
                    }
                  })}
                  </InnerColumn>
              </SidebarColumn>
            );
          })}
        </SidebarContainer>
      </SidebarPadding>
    </Themes.Sidebar>
  );
}
