import QosType from "@/core/mote/types/QosType";
import {PublishResponseType} from "@/core/mote/types/InflightMessageType";

export type PublisherOptionsType = {qos?: QosType, retain?: boolean};

type PublisherType = (topic: string, data: string, options?: PublisherOptionsType) => Promise<PublishResponseType>;

export default PublisherType;
