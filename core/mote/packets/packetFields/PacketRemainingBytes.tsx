import PacketField from "@/core/mote/packets/packetFields/PacketField";

export default class PacketRemainingBytes extends PacketField<Uint8Array> {
  toBytes(data: Uint8Array): Uint8Array {
    return data;
  }

  fromBytes(start: number, data: Uint8Array, remainingLength: number): [Uint8Array, number] {
    const result = data.slice(start, start + remainingLength);
    return [result, data.length - start];
  }
}
