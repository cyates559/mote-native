import {PublishResponseType} from "./InflightMessageType";

export default interface PublisherStateType<RequestType=string> {
   topic?: string | null;
   message?: RequestType | null;
   response?: PublishResponseType | null;
}