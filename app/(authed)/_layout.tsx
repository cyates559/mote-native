import {Redirect, Slot} from "expo-router";
import useMoteController from "@/features/mote/useMoteController";
import ConnectionState from "@/features/mote/types/ConnectionState";
import MoteContext from "@/features/mote/MoteContext";
import StoreProvider from "@/features/store/StoreProvider";
import ModuleLayout from "@/features/ModuleLayout/ModuleLayout";
import React from "react";
import {DeadEnd, Loading} from "@/components";

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
