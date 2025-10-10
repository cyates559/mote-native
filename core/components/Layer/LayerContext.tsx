import {createContext, ReactNode} from "react";
import {noop} from "@/core/utils";

export interface LayerControllerType {
  mount: (children: ReactNode) => number;
  update: (key: number, children: ReactNode) => void;
  unmount: (key: number) => void;
}

const LayerContext = createContext<LayerControllerType>({
  unmount: noop,
  mount: () => 0,
  update: noop,
});


export default LayerContext;