import BasePacket, {FieldListType} from "@/features/mote/packets/BasePacket";
import packetFields from "./packetFields";

export interface PacketWithIdDataType {
  id: number;
}

export default abstract class PacketWithId<PropsType=PacketWithIdDataType, PayloadType=PacketWithIdDataType> extends BasePacket<PropsType, PayloadType> {
  parseProps = (props: PropsType): [PayloadType, 0] => [props as any, 0];
  parsePayload = (data: PayloadType, flags: number): PropsType => data as any;
  getFields = () => [
    ["id", packetFields.packetId],
  ] as FieldListType<PacketWithIdDataType> as FieldListType<PayloadType>;
}
