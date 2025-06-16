import {ReactNode} from "react";
import useRouterController from "@/features/ModuleLayout/useRouterController";
import RouterContext from "@/features/ModuleLayout/RouterContext";
import ModulePropsType from "@/features/ModuleLayout/types/ModulePropsType";

export default function Router({children, ...rest}: {children: ReactNode} & ModulePropsType) {
  const controller = useRouterController(rest);
  return (
    <RouterContext.Provider value={controller}>
      {children}
    </RouterContext.Provider>
  );
}
