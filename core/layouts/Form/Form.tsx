import {FormView, FormViewPropsType} from "@/core/components";

import FormContext from "./FormContext";
import useFormController, {FormControllerPropsType} from "./useFormController";

export type FormPropsType<D> = FormViewPropsType & FormControllerPropsType<D>;

export default function Form<D>(props: FormPropsType<D>) {
  const {startData, onSubmit, ...viewProps} = props;
  return (
    <FormContext.Provider value={useFormController({startData, onSubmit})}>
      <FormView {...viewProps}/>
    </FormContext.Provider>
  );
}
