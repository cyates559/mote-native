import {styled, T, BackgroundView, NavTheme} from "@/components";
import useModuleRouter from "@/features/ModuleLayout/useModuleRouter";

const SidebarContainer = styled(BackgroundView, {
  style: {
    alignSelf: "stretch",
  },
});

export default function Sidebar() {
  const {routeOptions} = useModuleRouter();
  return (
    <NavTheme>
      <SidebarContainer>
        <T>
          <pre>
            {JSON.stringify(routeOptions, null, 2)}
          </pre>
        </T>
      </SidebarContainer>
    </NavTheme>
  );
}
