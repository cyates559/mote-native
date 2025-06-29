import PacketDoubleInt from "@/core/mote/packets/packetFields/PacketDoubleInt";
import PacketField from "@/core/mote/packets/packetFields/PacketField";

const lengthType = new PacketDoubleInt();

export default class PacketDynamicBytes extends PacketField<Uint8Array> {
  toBytes(data: Uint8Array): Uint8Array[] {
    return [
      lengthType.toBytes(data.length),
      data,
    ];
  }

  fromBytes(start: number, data: Uint8Array): [Uint8Array, number] {
    const [length] = lengthType.fromBytes(start, data);
    const strStart = start + 2;
    const result = data.slice(strStart, strStart + length);
    return [result, 2 + length];
  }
}
