import {DefaultIndexContainer, FormControllerType, FormErrorsType, useRetainTree} from "@/core";
import {useCallback} from "react";
import RokuDeviceForm, { RokuDeviceFormType } from "./RokuDeviceForm";

export default function AddRokuDevice() {
  const request = useRetainTree();
  const onSubmit = useCallback((form: FormControllerType<RokuDeviceFormType>) => {
    const rokuFormData = form.store;
    let errors: FormErrorsType<RokuDeviceFormType> | undefined;
    if(!rokuFormData.id) {
      errors = {...errors, id: ["This field cannot be blank"]};
    }
    if(!rokuFormData.host) {
      errors = {...errors, host: ["This field cannot be blank"]};
    }
    if(!rokuFormData.controllerId) {
      errors = {...errors, controllerId: ["This field cannot be blank"]};
    }
    if(!rokuFormData.name) {
      errors = {...errors, name: ["This field cannot be blank"]};
    }
    if(errors) {
      form.setErrors(errors);
      return;
    }
    request.send(`device/${rokuFormData.controllerId}/role/roku_controller/roku_device/${rokuFormData.id}/+`, {
      on: "0",
      host: rokuFormData.host!,
      name: rokuFormData.name!,
    });
  }, [request.send]);
  return (
    <DefaultIndexContainer>
      <RokuDeviceForm startData={{}} onSubmit={onSubmit} loading={request.loading}/>
    </DefaultIndexContainer>
  );
}