import StoreCallbackType from "@/features/store/types/StoreCallbackType";
import StoreType from "@/features/store/types/StoreType";
import StoreCallbackMapType from "@/features/store/types/StoreCallbackMapType";
import StoreKeyType from "@/features/store/types/StoreKeyType";
import StoreDataType from "@/features/store/types/StoreDataType";

export default interface StoreControllerType {
  store: StoreType;
  callbacks: StoreCallbackMapType;
  setState: (key: StoreKeyType, data: StoreDataType) => void;
  updateState: (update: StoreType) => void;
  addCallback: (key: StoreKeyType, callback: StoreCallbackType) => void;
  removeCallback: (key: StoreKeyType, callback: StoreCallbackType) => void;
}
