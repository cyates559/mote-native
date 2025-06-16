import PacketDynamicInt from "@/features/mote/packets/packetFields/PacketDynamicInt";
import PacketField from "@/features/mote/packets/packetFields/PacketField";

export type PairObject<T> = {
  [P in keyof T]: [P, PacketField<T[P]>, ((data: Partial<T> & {headerFlags: number}) => boolean)?]
};
export type Values<T> = T[keyof T];
export type FieldListType<T> = Values<PairObject<T>>[];

const lengthField = new PacketDynamicInt();

export default abstract class BasePacket<PropsType extends {}={}, PayloadType=PropsType> {
  abstract type: number;
  abstract getFields(): FieldListType<PayloadType>;
  abstract parseProps(props: PropsType): [PayloadType, number];
  abstract parsePayload(payload: PayloadType, flags: number): PropsType;

  toBytes(props: PropsType): Uint8Array {
    const [payload, headerFlags] = this.parseProps(props);
    let length = 0;
    const buffer: Uint8Array[] = [];
    const fullLoad = {...payload, headerFlags};
    for(const [key, field, checkIsEnabled] of this.getFields()) {
      if(checkIsEnabled && !checkIsEnabled(fullLoad)) {continue;}
      const result = field.toBytes(payload[key]);
      if(Array.isArray(result)) {
        length += result.reduce((sum, item) => sum + item.length, 0);
        buffer.push(...result);
      } else {
        length += result.length;
        buffer.push(result);
      }
    }
    const lengthData = lengthField.toBytes(length);
    // length += lengthData.length;

    let i = 0;
    const data = new Uint8Array(length + 1 + lengthData.length);
    data[i++] = this.type << 4 | headerFlags;
    for(const byte of lengthData) {
      data[i++] = byte;
    }
    for(const item of buffer) {
      for(const byte of item) {
        data[i++] = byte;
      }
    }
    return data;
  }

  fromBytes(headerFlags: number, data: Uint8Array) {
    let index = 1;
    const [expectedLength, lengthByteLength] = lengthField.fromBytes(index, data);
    index += lengthByteLength;
    let actualLength = 0;
    let remainingLength = expectedLength;
    const partialPayload: Partial<PayloadType> = {headerFlags} as any;
    for(const [key, field, checkIsEnabled] of this.getFields()) {
      if(checkIsEnabled && !checkIsEnabled(partialPayload as any)) {continue;}
      let length;
      [partialPayload[key], length] = field.fromBytes(index, data, remainingLength);
      index += length;
      actualLength += length;
      remainingLength -= length;
    }
    if(expectedLength !== actualLength) {
      throw new Error(`Expected packet length: ${expectedLength}, actual length: ${actualLength} `);
    }
    return this.parsePayload(partialPayload as PayloadType, headerFlags);
  }
}