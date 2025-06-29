import {createContext} from "react";
import StoreControllerType from "@/core/store/types/StoreControllerType";

const StoreContext = createContext<StoreControllerType>({} as any);

export default StoreContext;
