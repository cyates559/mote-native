import useSubscription from "@/features/mote/useSubscription";
import {LeafNodeType} from "@/features/mote/types/NodeType";
import QosType from "@/features/mote/QosType";

export default function useLeafSubscription(topic: string, qos?: QosType) {
  return useSubscription<LeafNodeType>(topic, qos);
}
