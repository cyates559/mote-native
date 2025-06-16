import packetFields from "./packetFields";
import PacketField from "@/features/mote/packets/packetFields/PacketField";
import QosType from "@/features/mote/QosType";
import BasePacket, {FieldListType} from "@/features/mote/packets/BasePacket";

export interface BaseConnectProps {
  protocol: string;
  protocolVersion: number;
  keepAlive: number;
  clientId: string;
  lastWillTopic?: string;
  lastWillMessage?: Uint8Array;
  username?: string;
  password?: string;
}

export interface ConnectProps extends BaseConnectProps {
  clean: boolean;
  willQos?: QosType;
  willRetain?: boolean;
}

export interface ConnectFlags {
  username: boolean;
  password: boolean;
  will: boolean;
  willRetain: boolean;
  willQos: QosType;
  clean: boolean;
}

export interface ConnectPayload extends BaseConnectProps {
  connectFlags: ConnectFlags;
}

const connectFlags = new class extends PacketField<ConnectFlags> {
  toBytes(flags: ConnectFlags): Uint8Array {
    const {username, password, will, willRetain, willQos = 0, clean} = flags;
    return new Uint8Array([
      (username ? 0x80 : 0) |
      (password ? 0x40 : 0) |
      (willRetain ? 0x20 : 0) |
      (willQos << 3) |
      (will ? 0x04 : 0) |
      (clean ? 0x02 : 0)
    ]);
  }
  fromBytes(start: number, data: Uint8Array): [ConnectFlags, number] {
    const byte = data[start];
    return [{
      username: (byte & 0x80) === 1,
      password: (byte & 0x40) === 1,
      willRetain: (byte & 0x20) === 1,
      willQos: (byte & 0x18) >> 3 as QosType,
      will: (byte & 0x04) === 1,
      clean: (byte & 0x02) === 1,
    }, 1];
  }
}();

export default class ConnectPacket extends BasePacket<ConnectProps, ConnectPayload> {
  type = 1;

  parseProps = (props: ConnectProps): [ConnectPayload, number] => [{
    protocol: props.protocol,
    protocolVersion: props.protocolVersion,
    connectFlags: {
      username: !!props.username,
      password: !!props.password,
      will: !!props.lastWillTopic,
      willRetain: props.willRetain?? false,
      willQos: props.willQos?? 0,
      clean: props.clean,
    },
    keepAlive: props.keepAlive,
    clientId: props.clientId,
    username: props.username,
    password: props.password,
    lastWillTopic: props.lastWillTopic,
    lastWillMessage: props.lastWillMessage,
  }, 0];

  parsePayload(payload: ConnectPayload): ConnectProps {
    const {
      protocol, protocolVersion, keepAlive,
      clientId, username, password,
      lastWillTopic, lastWillMessage, connectFlags,
    } = payload;
    return {
      protocol, protocolVersion, keepAlive, clientId,
      username, password,
      lastWillTopic, lastWillMessage,
      willRetain: connectFlags.willRetain,
      willQos: connectFlags.willQos,
      clean: connectFlags.clean,
    };
  }

  getFields = () => [
    ["protocol", packetFields.dynamicString],
    ["protocolVersion", packetFields.singleInt],
    ["connectFlags", connectFlags],
    ["keepAlive", packetFields.doubleInt],
    ["clientId", packetFields.dynamicString],
    ["lastWillTopic", packetFields.dynamicString, ({connectFlags}) => connectFlags?.will],
    ["lastWillMessage", packetFields.dynamicBytes, ({connectFlags}) => connectFlags?.will],
    ["username", packetFields.dynamicString, ({connectFlags}) => connectFlags?.username],
    ["password", packetFields.dynamicString, ({connectFlags}) => connectFlags?.password],
  ] as FieldListType<ConnectPayload>;
}