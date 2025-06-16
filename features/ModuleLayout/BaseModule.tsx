import ModulePropsType from "@/features/ModuleLayout/types/ModulePropsType";

export default abstract class BaseModule {
  abstract init(props: ModulePropsType): void;
}