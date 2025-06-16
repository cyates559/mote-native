import PacketWithId from "@/features/mote/packets/PacketWithId";

export default class PublishAcknowledgmentPacket extends PacketWithId {
  type = 4;
}
