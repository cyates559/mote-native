import PacketWithId from "@/features/mote/packets/PacketWithId";

export default class PublishReceivedPacket extends PacketWithId {
  type = 5;
}
