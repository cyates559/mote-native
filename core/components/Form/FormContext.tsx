import {createContext} from "react";
import {FormControllerType} from "./types";

const FormContext = createContext<FormControllerType>({} as any);

export default FormContext;