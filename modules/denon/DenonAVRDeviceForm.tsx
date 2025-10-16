import {
  Field, FieldErrors,
  FormCard,
  FormControllerPropsType,
  FormProvider,
  FormView, Loading,
  Option,
  Select,
  T,
  TextInput, useFormController, useRetainTree,
  useStore
} from "@/core";
import {rokuControllerNamesKey} from "@/modules/roku/keys";
import {FormCardFloatingButtonPropsType} from "@/core/components/FormCard/FormCardFloatingButton";
import {useCallback} from "react";
import LoadingOverlay from "@/core/components/Leaf/LoadingOverlay";


export type DenonAVRDeviceFormType = {
  id?: string;
  controllerId?: string;
  host?: string;
  name?: string;
}

type DenonAVRControllerNamesType = Record<string, string>;

type DenonAVRDeviceFormPropsType = FormControllerPropsType<DenonAVRDeviceFormType> & {
  loading: boolean;
};

type DenonAVRDeviceFormViewPropsType = FormControllerPropsType<DenonAVRDeviceFormType> & {
  controllerNames: DenonAVRControllerNamesType;
  loading: boolean;
};

export default function DenonAVRDeviceForm(props: DenonAVRDeviceFormPropsType) {
  const controllerNames = useStore<DenonAVRControllerNamesType>(rokuControllerNamesKey);
  if(controllerNames == null) {
    return <Loading text="Loading Denon AVR Controllers..."/>;
  }
  return <DenonAVRDeviceFormView {...props} controllerNames={controllerNames}/>
}

function DenonAVRDeviceFormView({controllerNames, loading, ...rest}: DenonAVRDeviceFormViewPropsType) {
  const form = useFormController(rest);
  const initialId = rest.startData.id;
  const header = `${initialId? "Edit": "Add"} Denon AVR Device`;
  const del = useRetainTree();
  const deleteDenonAVRDevice = useCallback(() => {
    del.send(`device/${rest.startData.controllerId}/role/denon_avr/avr_device/${initialId}/+`, {"/": "+"});
  }, [initialId]);
  const leftButton: FormCardFloatingButtonPropsType = {onPress: deleteDenonAVRDevice, icon: "Trash"};
  const rightButton: FormCardFloatingButtonPropsType = {onPress: form.submit, icon: "Save"};
  return (
    <FormProvider value={form}>
      <FormCard header={header} rightButton={rightButton} leftButton={initialId? leftButton: undefined}>
        <FormView>
          <T children="Name:"/>
          <Field type={TextInput} name="name" placeholder="My Amplifier" onSubmitEditing={form.submit}/>
          <FieldErrors name="name"/>
          <T children="Controller:"/>
          <Field type={Select} name="controllerId" selectTextOnFocus onSubmitEditing={form.submit}>
            {Object.keys(controllerNames).map(controllerId =>
              <Option key={controllerId} value={controllerId} children={controllerNames[controllerId]}/>
            )}
          </Field>
          <FieldErrors name="controllerId"/>
          <T children="ID:"/>
          <Field type={TextInput} name="id" placeholder="my_amp" onSubmitEditing={form.submit}/>
          <FieldErrors name="id"/>
          <T children="Host:"/>
          <Field type={TextInput} name="host" placeholder="10.0.0.200" onSubmitEditing={form.submit}/>
          <FieldErrors name="host"/>
        </FormView>
        {(del.loading || loading) && <LoadingOverlay/>}
      </FormCard>
    </FormProvider>
  );
}
