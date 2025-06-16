import {createContext} from "react";
import RouterType from "@/features/ModuleLayout/types/RouterType";

const RouterContext = createContext<RouterType>(null as any);

export default RouterContext;
