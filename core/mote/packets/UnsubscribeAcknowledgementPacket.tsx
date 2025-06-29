import PacketWithId from "@/core/mote/packets/PacketWithId";

export default class UnsubscribeAcknowledgementPacket extends PacketWithId {
  type = 11;
}
