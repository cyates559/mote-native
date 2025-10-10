import {useCallback, useMemo} from "react";
import {
  DefaultIndexContainer,
  FormControllerType,
  FormErrorsType,
  Loading,
  NotFound,
  useModuleRouter,
  useMote
} from "@/core";
import RokuDeviceForm, { RokuDeviceFormType } from "./RokuDeviceForm";
import useRokuDevices from "@/modules/roku/useRokuDevices";
import RokuDeviceType from "@/modules/roku/types/RokuDeviceType";


export default function EditRokuDevice() {
  const {nodeId} = useModuleRouter();
  const rokuDevices = useRokuDevices();
  // These should never happen, but only because the rokuDevice is needed for route options
  if(!rokuDevices) {
    return <Loading header="Edit Roku Device" text="Loading Device..."/>
  }
  const rokuDevice = rokuDevices[nodeId];
  if(!rokuDevice) {
    return <NotFound/>
  }
  return <EditRokuDeviceView deviceId={nodeId} rokuDevice={rokuDevice}/>
}

function EditRokuDeviceView({deviceId, rokuDevice}: {deviceId: string, rokuDevice: RokuDeviceType}) {
  const startData = useMemo(() => ({
    id: deviceId,
    host: rokuDevice.host,
    controllerId: rokuDevice.controllerId,
    name: rokuDevice.title,
  }), [rokuDevice]);
  const {retainTree} = useMote();
  const onSubmit = useCallback((form: FormControllerType<RokuDeviceFormType>) => {
    const rokuFormData = form.store;
    if(deviceId !== rokuFormData.id || rokuDevice.controllerId !== rokuFormData.controllerId) {
      retainTree(`device/${rokuDevice.controllerId}/role/roku_controller/roku_device/${deviceId}/+`, {"/": "+"});
    }
    let errors: FormErrorsType<RokuDeviceFormType> | undefined;
    if(!rokuFormData.id) {
      errors = {...errors, id: "This field cannot be blank"};
    }
    if(!rokuFormData.host) {
      errors = {...errors, host: "This field cannot be blank"};
    }
    if(!rokuFormData.controllerId) {
      errors = {...errors, controllerId: "This field cannot be blank"};
    }
    if(!rokuFormData.name) {
      errors = {...errors, name: "This field cannot be blank"};
    }
    if(errors) {
      form.setErrors(errors);
      console.error(errors)
      return;
    }
    retainTree(`device/${rokuFormData.controllerId}/role/roku_controller/roku_device/${rokuFormData.id}/+`, {
      on: "0",
      host: rokuFormData.host!,
      name: rokuFormData.name!,
    });

  }, [retainTree]);
  return (
    <DefaultIndexContainer>
      <RokuDeviceForm startData={startData} onSubmit={onSubmit}/>
    </DefaultIndexContainer>
  );
}