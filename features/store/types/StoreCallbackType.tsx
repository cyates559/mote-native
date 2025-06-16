import StoreDataType from "@/features/store/types/StoreDataType";

type StoreCallbackType<V=StoreDataType> = (value: V) => void;

export default StoreCallbackType;
