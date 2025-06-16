import {useContext} from "react";
import RouterContext from "@/features/ModuleLayout/RouterContext";

export default function useModuleRouter() { return useContext(RouterContext); }
