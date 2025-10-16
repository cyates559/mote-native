import {useCallback, useMemo} from "react";
import {
  DefaultIndexContainer,
  FormControllerType,
  FormErrorsType,
  Loading,
  NotFound,
  useModuleRouter,
  useRetainTree
} from "@/core";
import DenonAVRDeviceForm, { DenonAVRDeviceFormType } from "./DenonAVRDeviceForm";
import useDenonAVRDevices from "./useDenonAVRDevices";
import DenonAVRDeviceType from "./types/DenonAVRDeviceType";


export default function EditDenonAVRDevice() {
  const {nodeId} = useModuleRouter();
  const avrDevices = useDenonAVRDevices();
  // These should never happen, but only because the avrDevice is needed for route options
  if(!avrDevices) {
    return <Loading header="Edit Denon AVR Device" text="Loading Device..."/>
  }
  const avrDevice = avrDevices[nodeId];
  if(!avrDevice) {
    return <NotFound/>
  }
  return <EditDenonAVRDeviceView deviceId={nodeId} avrDevice={avrDevice}/>
}

function EditDenonAVRDeviceView({deviceId, avrDevice}: {deviceId: string, avrDevice: DenonAVRDeviceType}) {
  const startData = useMemo(() => ({
    id: deviceId,
    host: avrDevice.host,
    controllerId: avrDevice.controllerId,
    name: avrDevice.title,
  }), [avrDevice]);
  const request = useRetainTree();
  const onSubmit = useCallback((form: FormControllerType<DenonAVRDeviceFormType>) => {
    const denonAvrDeviceFormData = form.store;
    if(deviceId !== denonAvrDeviceFormData.id || avrDevice.controllerId !== denonAvrDeviceFormData.controllerId) {
      request.send(`device/${avrDevice.controllerId}/role/denon_avr/avr_device/${deviceId}/+`, {"/": "+"});
    }
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
      host: denonAvrDeviceFormData.host!,
      name: denonAvrDeviceFormData.name!,
    });

  }, [request.send]);
  return (
    <DefaultIndexContainer>
      <DenonAVRDeviceForm startData={startData} onSubmit={onSubmit} loading={request.loading}/>
    </DefaultIndexContainer>
  );
}