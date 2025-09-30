import {createContext} from "react";
import MoteControllerType from "../../mote/types/MoteControllerType";
import ConnectionState from "@/core/mote/types/ConnectionState";
import noop from "@/core/utils/noop";

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
} as any);
export default MoteContext;
