import ModulePropsType from "@/core/layouts/MoteLayout/types/ModulePropsType";

export default abstract class BaseModule {
  abstract init(props: ModulePropsType): void;
}