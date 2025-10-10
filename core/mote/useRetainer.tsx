import {useContext, useEffect, useRef, useState} from "react";
import MoteContext from "@/core/layouts/MoteLayout/MoteContext";

export default function useRetainer() {
  const {retain} = useContext(MoteContext);
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