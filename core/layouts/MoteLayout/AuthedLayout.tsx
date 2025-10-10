import {useEffect, useRef} from "react";
import {router, useGlobalSearchParams} from "expo-router";
import {Leaf, Loading, joinPaths} from "@/core/components";
import {StoreProvider} from "@/core/store";
import {ConnectionState, useMote} from "@/core/mote";
import MoteContext from "./MoteContext";
import ModuleLayout from "./ModuleLayout";
import {AsyncStorageLayout} from "../AsyncStorageLayout";

export default function AuthedLayout() {
  const mote = useMote();
  // I'm upset
  const route = useGlobalSearchParams().route;
  const routeRef = useRef(route);
  useEffect(() => {
    if(mote.state === ConnectionState.DISCONNECTED) {
      router.replace({pathname: joinPaths("/login", ...(routeRef.current?? [])) as any},);
    }
  }, [mote.state]);
  useEffect(() => {routeRef.current = route;}, [route]);

  switch (mote.state) {
    case ConnectionState.DISCONNECTED:
      return <Leaf header="Redirecting..."/>
    case ConnectionState.AUTHENTICATING:
      return (
        <Loading
          header="Logging in..."
          text="Almost there"
        />
      );
    case ConnectionState.CONNECTING:
    case ConnectionState.NOT_CONNECTED:
      return (
        <Loading
          header="Connecting..."
          text="Don't hold your breath"
        />
      );
    default: case ConnectionState.ERROR:
      return (
        <Leaf
          header="Error"
          text={mote.state + " " + mote.error}
        />
      );
    case ConnectionState.AUTHENTICATED:
      return (
        <AsyncStorageLayout>
          <MoteContext.Provider value={mote}>
            <StoreProvider>
              <ModuleLayout/>
            </StoreProvider>
          </MoteContext.Provider>
        </AsyncStorageLayout>
      );
  }
};
