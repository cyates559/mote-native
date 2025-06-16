import QosType from "@/features/mote/QosType";

export type PublisherOptionsType = {qos?: QosType, retain?: boolean};

type PublisherType = (topic: string, data: string, options?: PublisherOptionsType) => void;

export default PublisherType;
