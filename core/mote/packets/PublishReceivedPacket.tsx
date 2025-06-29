import PacketWithId from "@/core/mote/packets/PacketWithId";

export default class PublishReceivedPacket extends PacketWithId {
  type = 5;
}
