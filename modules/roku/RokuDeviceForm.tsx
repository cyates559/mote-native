import {
  Field,
  FormCard,
  FormControllerPropsType,
  FormProvider,
  FormView, Loading,
  Option,
  Select,
  T,
  TextInput, useFormController, useMote,
  useStore
} from "@/core";
import {rokuControllerNamesKey} from "@/modules/roku/keys";
import {FormCardFloatingButtonPropsType} from "@/core/components/FormCard/FormCardFloatingButton";
import {useCallback} from "react";


export type RokuDeviceFormType = {
  id?: string;
  controllerId?: string;
  host?: string;
  name?: string;
}

type RokuControllerNamesType = Record<string, string>;

type RokuDeviceFormViewPropsType = FormControllerPropsType<RokuDeviceFormType> & {controllerNames: RokuControllerNamesType};

export default function RokuDeviceForm(props: FormControllerPropsType<RokuDeviceFormType>) {
  const controllerNames = useStore<RokuControllerNamesType>(rokuControllerNamesKey);
  if(controllerNames == null) {
    return <Loading text="Loading Roku Controllers..."/>;
  }
  return <RokuDeviceFormView {...props} controllerNames={controllerNames}/>
}

function RokuDeviceFormView({controllerNames, ...rest}: RokuDeviceFormViewPropsType) {
  const form = useFormController(rest);
  const initialId = rest.startData.id;
  const {retainTree} = useMote();
  const header = `${initialId? "Edit": "Add"} Roku Device`;
  const deleteRokuDevice = useCallback(() => {
    retainTree(`device/${rest.startData.controllerId}/role/roku_controller/roku_device/${initialId}/+`, {"/": "+"});
  }, [initialId]);
  const leftButton: FormCardFloatingButtonPropsType = {onPress: deleteRokuDevice, icon: "Trash"};
  const rightButton: FormCardFloatingButtonPropsType = {onPress: form.submit, icon: "Save"};
  return (
    <FormProvider value={form}>
      <FormCard header={header} rightButton={rightButton} leftButton={initialId? leftButton: undefined}>
        <FormView pairStyle={{}}>
          <T children="Name:"/>
          <Field type={TextInput} name="name" placeholder="My Roku" onSubmitEditing={form.submit}/>
          <T children="Controller:"/>
          <Field type={Select} name="controllerId" selectTextOnFocus onSubmitEditing={form.submit}>
            {Object.keys(controllerNames).map(controllerId =>
              <Option key={controllerId} value={controllerId} children={controllerNames[controllerId]}/>
            )}
          </Field>
          <T children="ID:"/>
          <Field type={TextInput} name="id" placeholder="my_roku" onSubmitEditing={form.submit}/>
          <T children="Host:"/>
          <Field type={TextInput} name="host" placeholder="10.0.0.200" onSubmitEditing={form.submit}/>
        </FormView>
      </FormCard>
    </FormProvider>
  );
}
