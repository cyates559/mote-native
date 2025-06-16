import PacketDynamicString from "@/features/mote/packets/packetFields/PacketDynamicString";
import PacketDynamicBytes from "@/features/mote/packets/packetFields/PacketDynamicBytes";
import PacketSingleInt from "@/features/mote/packets/packetFields/PacketSingleInt";
import PacketDoubleInt from "@/features/mote/packets/packetFields/PacketDoubleInt";
import QosType from "@/features/mote/QosType";
import PacketRemainingBytes from "@/features/mote/packets/packetFields/PacketRemainingBytes";

const packetFields = {
  dynamicString: new PacketDynamicString(),
  dynamicBytes: new PacketDynamicBytes(),
  remainingBytes: new PacketRemainingBytes(),
  singleInt: new PacketSingleInt(),
  qos: new PacketSingleInt<QosType>(),
  doubleInt: new PacketDoubleInt(),
  packetId: new PacketDoubleInt(),
};

export default packetFields;
