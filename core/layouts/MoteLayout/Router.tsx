import {ReactNode} from "react";
import useRouterController from "@/core/layouts/MoteLayout/useRouterController";
import RouterContext from "@/core/layouts/MoteLayout/RouterContext";
import ModulePropsType from "@/core/layouts/MoteLayout/types/ModulePropsType";

export default function Router({children, ...rest}: {children: ReactNode} & ModulePropsType) {
  const controller = useRouterController(rest);
  return (
    <RouterContext.Provider value={controller}>
      {children}
    </RouterContext.Provider>
  );
}
