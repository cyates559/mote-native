import MoteStateType from "@/core/mote/types/MoteStateType";
import ConnectionState from "@/core/mote/types/ConnectionState";

const defaultState: MoteStateType = {
  connectionState: ConnectionState.DISCONNECTED,
  outgoingMessages: [],
  outgoingSubscribes: [],
  outgoingUnsubscribes: [],
  retries: 0,
  pingTimeout: 0,
  pongTimeout: 0,
  listeners: {},
  listenerData: {},
  subscriptions: {},
  subscriptionData: {},
  error: null,
};

export default defaultState;
