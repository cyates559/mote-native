import StoreDataType from "@/core/store/types/StoreDataType";

type StoreCallbackType<V=StoreDataType> = (value: V) => void;

export default StoreCallbackType;
