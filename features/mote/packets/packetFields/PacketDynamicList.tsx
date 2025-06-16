import PacketField from "@/features/mote/packets/packetFields/PacketField";
import {FieldListType} from "@/features/mote/packets/BasePacket";

export default abstract class PacketDynamicList<V> extends PacketField<V[]> {
  abstract getFields(): FieldListType<V>;
  toBytes(data: V[]) {
    const buffer: Uint8Array[] = [];
    for(const value of data) for(const [key, field] of this.getFields()) {
      const result = field.toBytes(value[key]);
      if(Array.isArray(result)) {
        length += result.reduce((sum, item) => sum + item.length, 0);
        buffer.push(...result);
      } else {
        length += result.length;
        buffer.push(result);
      }
    }
    return buffer;
  }

  fromBytes(start: number, data: Uint8Array, remainingLength: number): [V[], number] {
    const result: V[] = [];
    let index = start;
    let totalLength = 0;
    while(totalLength < remainingLength) {
      const value: Partial<V> = {};
      for(const [key, field] of this.getFields()) {
        let length;
        [value[key], length] = field.fromBytes(index, data, 0 /* I'm lazy */);
        index += length;
        totalLength += length;
      }
      result.push(value as V);
    }
    return [result, totalLength];
  }
}
