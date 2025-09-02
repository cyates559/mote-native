import {Fragment} from "react";
import {Slot} from "expo-router";
import {Row, View, ViewStyleType, SafeAreaView, ThemeType, styled} from "@/core/components";
import * as modules from "@/modules";

import ModulePropsType from "./types/ModulePropsType";
import RouteType from "./types/RouteType";
import BaseModule from "./BaseModule";
import Router from "./Router";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar";

const settingsComposer: RouteType[] = [];

const props: ModulePropsType = {
  baseHref: "/m/" as any,
  settingsComposer,
  workers: [],
  composer: [],
};

for(const moduleName in modules) {
  const module = new (modules[moduleName as never] as any)() as BaseModule;
  module.init(props)
}

props.composer.push({
  nodeId: "settings",
  title: "Settings",
  icon: "Settings",
  children: settingsComposer,
});


props.composer.push({
  nodeId: "logout",
  title: "Disconnect",
  href: "/",
  hrefMode: "replace",
  icon: "DoorOpen",
  children: settingsComposer,
});

const MainContainer = styled(Row, {
  style: ({backgroundColor}: ThemeType): ViewStyleType => ({
    height: "100%",
    backgroundColor,
  }),
});

const ContentContainer = styled(View, {
  style: {
    alignItems: "stretch",
    flex: 1,
  }
});

/// VOCAB TIME
// Route - A list of the user's url parts ["split", "by" "slashes"]
// Composer - A nested object with store keys that point to page options...
// ComposerTree - A tree version that has quicker lookup but neglects sorting...
// Route Options - A list corresponding to what options there are at each point in the current route.

// Note - The full layout tree is never actually stored in memory...

export default function ModuleLayout() {
  return (
    <>
      {props.workers.map((Worker, i) => <Fragment key={i}><Worker/></Fragment>)}
      <Router {...props}>
        <SafeAreaView style={{ flex: 1 }}>
          <MainContainer>
            <Sidebar/>
            <ContentContainer>
              <Navbar/>
              <Slot/>
            </ContentContainer>
          </MainContainer>
        </SafeAreaView>
      </Router>
    </>
  );
}
