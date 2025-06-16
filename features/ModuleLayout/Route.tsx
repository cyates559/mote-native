import useModuleRouter from "@/features/ModuleLayout/useModuleRouter";

export default function Route() {
  const {Page} = useModuleRouter();
  return <Page/>
}