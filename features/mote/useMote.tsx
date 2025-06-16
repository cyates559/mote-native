import {useContext} from "react";
import MoteContext from "@/features/mote/MoteContext";

export default function useMote() {
  return useContext(MoteContext);
}
