import {createContext} from "react";
import StoreControllerType from "@/features/store/types/StoreControllerType";

const StoreContext = createContext<StoreControllerType>({} as any);

export default StoreContext;
