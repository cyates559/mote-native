import PacketField from "@/core/mote/packets/packetFields/PacketField";

export default class PacketDynamicInt extends PacketField<number> {
  toBytes(data: number): Uint8Array {
    let remainingData = data;
    const lengthBuffer: number[] = [];
    while (true) {
      let lengthByte = remainingData % 0x80;
      remainingData = Math.trunc(remainingData / 0x80);
      if (remainingData > 0) {
        lengthByte |= 0x80;
      }
      lengthBuffer.push(lengthByte)
      if (remainingData <= 0) {
        break;
      }
    }
    return new Uint8Array(lengthBuffer);
  }

  fromBytes(start: number, data: Uint8Array): [number, number] {
    let multiplier = 1
    let value = 0
    let length = 0;
    while (true) {
      const currentByte = data[start + length];
      length++;
      value += (currentByte & 0x7F) * multiplier;
      if ((currentByte & 0x80) === 0) {
        return [value, length];
      } else {
        multiplier *= 0x80
      }
    }
  }
}
