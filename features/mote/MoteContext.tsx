import {createContext} from "react";
import MoteControllerType from "./types/MoteControllerType";
import ConnectionState from "@/features/mote/types/ConnectionState";
import noop from "@/utils/noop";

const MoteContext = createContext<MoteControllerType>({
  state: ConnectionState.DISCONNECTED,
  error: null,
  publish: noop,
  subscribe: noop,
  reconnect: noop,
  unsubscribe: noop,
  command: noop,
  spray: noop,
  retain: noop,
  retainTree: noop,
  getSubscriptionData: noop,
  addSubscription: noop,
  addSubscriptions: noop,
  addListener: noop,
  removeSubscription: noop,
  removeListener: noop,
});
export default MoteContext;
