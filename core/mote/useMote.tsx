import {useContext} from "react";
import MoteContext from "@/core/layouts/MoteLayout/MoteContext";

export default function useMote() {
  return useContext(MoteContext);
}
