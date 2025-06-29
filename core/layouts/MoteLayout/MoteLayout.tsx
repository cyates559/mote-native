import {Redirect} from "expo-router";
import {Loading, DeadEnd} from "@/core/components";
import {StoreProvider} from "@/core/store";
import {useMoteController, ConnectionState} from "@/core/mote";
import MoteContext from "./MoteContext";
import ModuleLayout from "./ModuleLayout";

export default function MoteLayout() {
  const mote = useMoteController();
  switch (mote.state) {
    case ConnectionState.AUTHENTICATING:
      return (
        <Loading
          header="Authenticating..."
          text="Almost theme"
        />
      );
    case ConnectionState.CONNECTING:
      return (
        <Loading
          header="Connecting..."
          text="Don't hold your breath"
        />
      );
    default: case ConnectionState.ERROR:
      return (
        <DeadEnd
          header="Error"
          text={mote.state + " " + mote.error}
        />
      );
    case ConnectionState.DISCONNECTED:
      return <Redirect href="/"/>
    case ConnectionState.AUTHENTICATED:
      return (
        <MoteContext.Provider value={mote}>
          <StoreProvider>
            <ModuleLayout/>
          </StoreProvider>
        </MoteContext.Provider>
      );
  }
};
