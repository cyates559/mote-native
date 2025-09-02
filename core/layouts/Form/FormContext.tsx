import {createContext} from "react";
import {FormControllerType} from "./types";
import {noop} from "@/core/utils";

const FormContext = createContext<FormControllerType>({store: null as any, enabled: false, setEnabled: noop});

export default FormContext;