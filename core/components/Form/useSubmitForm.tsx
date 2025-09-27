import {useContext} from "react";
import FormContext from "./FormContext";

export default function useSubmitForm() {
  return useContext(FormContext).submit;
}