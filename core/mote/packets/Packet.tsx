import BasePacket from "@/core/mote/packets/BasePacket";
import ConnectPacket from "@/core/mote/packets/ConnectPacket";
import ConnectAcknowledgementPacket from "@/core/mote/packets/ConnectAcknowledgementPacket";
import PingRequestPacket from "@/core/mote/packets/PingRequestPacket";
import PingResponsePacket from "@/core/mote/packets/PingResponsePacket";
import PublishPacket from "@/core/mote/packets/PublishPacket";
import PublishAcknowledgmentPacket from "@/core/mote/packets/PublishAcknowledgmentPacket";
import PublishReceivedPacket from "@/core/mote/packets/PublishReceivedPacket";
import PublishCompletePacket from "@/core/mote/packets/PublishCompletePacket";
import PublishReleasedPacket from "@/core/mote/packets/PublishReleasedPacket";
import SubscribeAcknowledgementPacket from "@/core/mote/packets/SubscribeAcknowledgementPacket";
import SubscribePacket from "@/core/mote/packets/SubscribePacket";
import UnsubscribeAcknowledgementPacket from "@/core/mote/packets/UnsubscribeAcknowledgementPacket";
import UnsubscribePacket from "@/core/mote/packets/UnsubscribePacket";
import DisconnectPacket from "@/core/mote/packets/DisconnectPacket";

const packetNamesMap = {
  connect: new ConnectPacket(),
  connack: new ConnectAcknowledgementPacket(),
  publish: new PublishPacket(),
  puback: new PublishAcknowledgmentPacket(),
  pubrec: new PublishReceivedPacket(),
  pubrel: new PublishReleasedPacket(),
  pubcomp: new PublishCompletePacket(),
  subscribe: new SubscribePacket(),
  suback: new SubscribeAcknowledgementPacket(),
  unsubscribe: new UnsubscribePacket(),
  unsuback: new UnsubscribeAcknowledgementPacket(),
  pingreq: new PingRequestPacket(),
  pingresp: new PingResponsePacket(),
  disconnect: new DisconnectPacket(),
};

export type PacketPropsType<K extends PacketNameType> = Parameters<AllPacketsType[K]["toBytes"]>[0];
export type AllPacketsType = typeof packetNamesMap;
export type PacketNameType = keyof AllPacketsType;

const keys = Object.keys(packetNamesMap);

const packetIdsMap = keys.reduce((map, key) => {
  const packetName = key as PacketNameType;
  const packet = packetNamesMap[packetName];
  map[packet.type] = [packetName, packet as never as BasePacket];
  return map;
}, {} as {[type: number]: [PacketNameType, BasePacket]});

const Packet = {
  toBytes: <K extends PacketNameType>(name: K, data: PacketPropsType<K>) => packetNamesMap[name].toBytes(data as never),
  fromBytes: (arrayBuffer: ArrayBuffer) => {
    const data = new Uint8Array(arrayBuffer);
    const header = data[0];
    const type = header >> 4;
    const headerFlags = header & 0xF;
    const [packetName, packet] = packetIdsMap[type];
    return [packetName, packet.fromBytes(headerFlags, data)];
  }
};

export default Packet;
