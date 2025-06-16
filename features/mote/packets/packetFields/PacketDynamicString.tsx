import PacketField from "./PacketField";
import PacketDoubleInt from "./PacketDoubleInt";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const lengthType = new PacketDoubleInt();

export default class PacketDynamicString extends PacketField<string> {
  toBytes(data: string): Uint8Array[] {
    const encoded = encoder.encode(data);
    return [
      lengthType.toBytes(encoded.length),
      encoded,
    ];
  }

  fromBytes(start: number, data: Uint8Array): [string, number] {
    const [length] = lengthType.fromBytes(start, data);
    const strStart = start + 2;
    const result = decoder.decode(data.slice(strStart, strStart + length));
    return [result, 2 + length];
  }
}
