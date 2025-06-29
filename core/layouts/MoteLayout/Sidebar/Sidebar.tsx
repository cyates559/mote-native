import {useCallback, useEffect, useMemo, useState} from "react";
import {Dimensions, LayoutChangeEvent} from "react-native";
import {T, BackgroundView, BaseButtonLink, Icon, styled, View, ScrollView, Spinner, SidebarTheme} from "@/core/components";
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
  // contentContainerStyle: {
  //   gap: 4,
  //   flexBasis: "auto",
  //   flexShrink: 0,
  //   flexGrow: 0,
  //   overflowX: "hidden",
  // },
});

const InnerColumn = styled(View, {
  style: {
    padding: 4,
    flexBasis: "auto",
    overflowX: "hidden",
  }
})

const SidebarLink = styled(BaseButtonLink, {
  style: {
    justifyContent: "flex-start",
    borderRadius: 1000,
  }
});

const sidebarPercentage = 0.3;

export default function Sidebar() {
  const {routeOptions} = useModuleRouter();
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
  const width = useMemo(() => {
    let total = 0;
    const max = pageWidth * sidebarPercentage;
    for (const size of sizes) {
      const newTotal = total + size;
      if(newTotal > max) {
        return total;
      }
      total = newTotal;
    }
    return total;
  }, [pageWidth, sizes]);
  const currentSizeStyle = useMemo(() => ({width}), [width]);
  return (
    <SidebarTheme>
      <SidebarPadding style={width === 0? {paddingHorizontal: 0}: undefined}>
        <SidebarContainer style={currentSizeStyle}>
          {routeOptions.slice(0, -1).map((options, i) =>
            <SidebarColumn key={i}>
              <InnerColumn onLayout={(event) => onLayout(i, event)}>
                {options.map((option, i) => (typeof option === "string"?
                  <Spinner key={i} children={option}/>:
                  <SidebarLink key={option.nodeId} href={option.href} hrefMode={option.hrefMode}>
                    <Icon name={option.icon}/>
                    <T>
                      {option.title}
                    </T>
                  </SidebarLink>
                ))}
              </InnerColumn>
            </SidebarColumn>
          )}
        </SidebarContainer>
      </SidebarPadding>
    </SidebarTheme>
  );
}
