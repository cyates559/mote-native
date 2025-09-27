import {ReactNode} from "react";
import useFormController, {FormControllerPropsType} from "./useFormController";
import FormProvider from "./FormProvider";

export type FormPropsType<D> = { children?: ReactNode } & FormControllerPropsType<D>;

export default function Form<D extends Record<string, any>>(props: FormPropsType<D>) {
  const {startData, onSubmit, children} = props;
  return (
    <FormProvider value={useFormController({startData, onSubmit})} children={children}/>
  );
}
