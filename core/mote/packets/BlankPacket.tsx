import BasePacket from "@/core/mote/packets/BasePacket";

export default abstract class BlankPacket extends BasePacket {
  parseProps = (): [{}, 0] => [{}, 0];
  parsePayload = (): {} => ({});
  getFields = () => [];
}
