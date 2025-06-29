import StoreCallbackType from "@/core/store/types/StoreCallbackType";
import StoreType from "@/core/store/types/StoreType";
import StoreCallbackMapType from "@/core/store/types/StoreCallbackMapType";
import StoreKeyType from "@/core/store/types/StoreKeyType";
import StoreDataType from "@/core/store/types/StoreDataType";

export default interface StoreControllerType {
  store: StoreType;
  callbacks: StoreCallbackMapType;
  setState: (key: StoreKeyType, data: StoreDataType) => void;
  updateState: (update: StoreType) => void;
  addCallback: (key: StoreKeyType, callback: StoreCallbackType) => void;
  removeCallback: (key: StoreKeyType, callback: StoreCallbackType) => void;
}
