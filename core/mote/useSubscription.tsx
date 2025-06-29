import {useContext, useEffect, useRef, useState} from "react";
import MoteContext from "@/core/layouts/MoteLayout/MoteContext";
import QosType from "@/core/mote/types/QosType";
import NodeType, {BranchNodeType} from "@/core/mote/types/NodeType";

export default function useSubscription<T extends NodeType=BranchNodeType>(topic: string, qos?: QosType){
  const {addSubscription, removeSubscription, getSubscriptionData} = useContext(MoteContext);
  const [value, setValue] = useState(getSubscriptionData(topic)?? null);
  const savedTopic = useRef<string | null>(null);
  useEffect(() => {
    if (savedTopic.current !== null) {
      removeSubscription(savedTopic.current, setValue);
      setValue(null);
    }
    addSubscription(topic, setValue, qos);
    savedTopic.current = topic;
  }, [topic, qos])
  useEffect(() => {
    return () => {
      const topic = savedTopic.current;
      if (topic !== null) {
        savedTopic.current = null;
        removeSubscription(topic, setValue);
      }
    }
  }, [])
  return value as T;
}
