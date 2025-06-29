import useSubscription from "@/core/mote/useSubscription";
import {LeafNodeType} from "@/core/mote/types/NodeType";
import QosType from "@/core/mote/types/QosType";

export default function useLeafSubscription(topic: string, qos?: QosType) {
  return useSubscription<LeafNodeType>(topic, qos);
}
