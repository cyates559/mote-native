import PacketDynamicString from "@/core/mote/packets/packetFields/PacketDynamicString";
import PacketDynamicBytes from "@/core/mote/packets/packetFields/PacketDynamicBytes";
import PacketSingleInt from "@/core/mote/packets/packetFields/PacketSingleInt";
import PacketDoubleInt from "@/core/mote/packets/packetFields/PacketDoubleInt";
import QosType from "@/core/mote/types/QosType";
import PacketRemainingBytes from "@/core/mote/packets/packetFields/PacketRemainingBytes";

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
