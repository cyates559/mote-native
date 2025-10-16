import {useCallback} from "react";
import {DefaultIndexContainer, FormControllerType, FormErrorsType, useRetainTree} from "@/core";
import DenonAVRDeviceForm, { DenonAVRDeviceFormType } from "./DenonAVRDeviceForm";

export default function AddDenonAVRDevice() {
  const request = useRetainTree();
  const onSubmit = useCallback((form: FormControllerType<DenonAVRDeviceFormType>) => {
    const denonAvrDeviceFormData = form.store;
    let errors: FormErrorsType<DenonAVRDeviceFormType> | undefined;
    if(!denonAvrDeviceFormData.id) {
      errors = {...errors, id: ["This field cannot be blank"]};
    }
    if(!denonAvrDeviceFormData.host) {
      errors = {...errors, host: ["This field cannot be blank"]};
    }
    if(!denonAvrDeviceFormData.controllerId) {
      errors = {...errors, controllerId: ["This field cannot be blank"]};
    }
    if(!denonAvrDeviceFormData.name) {
      errors = {...errors, name: ["This field cannot be blank"]};
    }
    if(errors) {
      form.setErrors(errors);
      return;
    }
    request.send(`device/${denonAvrDeviceFormData.controllerId}/role/denon_avr/avr_device/${denonAvrDeviceFormData.id}/+`, {
      power_state: "UNKNOWN",
      host: denonAvrDeviceFormData.host!,
      name: denonAvrDeviceFormData.name!,
    });
  }, [request.send]);
  return (
    <DefaultIndexContainer>
      <DenonAVRDeviceForm startData={{}} onSubmit={onSubmit} loading={request.loading}/>
    </DefaultIndexContainer>
  );
}