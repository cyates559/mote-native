export default abstract class PacketField<T=unknown> {
  abstract toBytes(data: T): Uint8Array | Uint8Array[];
  abstract fromBytes(start: number, data: Uint8Array, remainingLength: number): [T, number];
}
