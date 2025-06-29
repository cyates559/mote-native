import PacketField from "@/core/mote/packets/packetFields/PacketField";

export default class PacketSingleInt<T extends number> extends PacketField<T> {
  toBytes(data: number): Uint8Array {
    return new Uint8Array([data & 0x00FF]);
  }
  fromBytes(start: number, data: Uint8Array): [T, number] {
    return [data[start] as T, 1];
  }
}
