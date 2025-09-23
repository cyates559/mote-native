import {useContext, useEffect, useRef, useState} from "react";
import MoteContext from "@/core/layouts/MoteLayout/MoteContext";
import QosType from "@/core/mote/types/QosType";
import NodeType, {BranchNodeType} from "@/core/mote/types/NodeType";

export default function useEventListener<T extends NodeType=BranchNodeType>(topic: string, qos?: QosType) {
  const {addListener, removeListener, getCachedEvents} = useContext(MoteContext);
  const [value, setValue] = useState(getCachedEvents(topic)?? []);
  const savedTopic = useRef<string | null>(null);
  useEffect(() => {
    if (savedTopic.current !== null) {
      removeListener(savedTopic.current, setValue);
      setValue([]);
    }
    addListener(topic, setValue, qos);
    savedTopic.current = topic;
  }, [topic, qos])
  useEffect(() => {
    return () => {
      const topic = savedTopic.current;
      if (topic !== null) {
        savedTopic.current = null;
        removeListener(topic, setValue);
      }
    }
  }, [removeListener])
  return value as T[];
}
