import {useContext} from "react";
import RouterContext from "./RouterContext";

export default function useModuleRouter() { return useContext(RouterContext); }
