import PacketField from "@/core/mote/packets/packetFields/PacketField";

export default class PacketDoubleInt extends PacketField<number> {
  toBytes(data: number): Uint8Array {
    return new Uint8Array([data >> 8, data & 0x00FF]);
  }
  fromBytes(start: number, data: Uint8Array): [number, number] {
    return [data[start] << 8 | data[start+1], 2];
  }
}
