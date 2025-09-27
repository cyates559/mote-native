import {
  DefaultIndexContainer,
  Field,
  FormCard,
  FormProvider,
  FormView,
  Loading,
  T,
  TextInput,
  useFormController, useMote,
  useStore
} from "@/core";
import {rokuControllerNamesKey} from "@/modules/roku/keys";
import {useCallback} from "react";

type RokuControllerNamesType = Record<string, string>;

type RokuFormType = {
  id: string;
  controller: string;
  host: string;
  name: string;
}

export default function AddRokuDevice() {
  const controllerNames = useStore<RokuControllerNamesType>(rokuControllerNamesKey);
  if(controllerNames === null) {
    return <Loading children="Loading Roku Device..."/>;
  }
  return <AddRokuDeviceView controllerNames={controllerNames}/>
}

function AddRokuDeviceView({controllerNames}: {controllerNames: RokuControllerNamesType}) {
  const {retainTree} = useMote();
  const onSubmit = useCallback((roku: RokuFormType) => {
    retainTree(`device/${roku.controller}/roku_device/${roku.id}/+`, {
      on: "0",
      host: roku.host,
      name: roku.name,

    });
  }, [retainTree]);
  const form = useFormController({startData: {}, onSubmit});
  return (
    <DefaultIndexContainer>
      <FormProvider value={form}>
        <FormCard header="Retain" rightButton={{onPress: form.submit, icon: "Save"}}>
          <FormView>
            <T children="Topic:"/>
            <Field type={TextInput} name="topic" icon="Paperclip" placeholder="device/aphrodite/name" onSubmitEditing={form.submit}/>
            <T children="Message:"/>
            <Field type={TextInput} name="message" placeholder="" onSubmitEditing={form.submit}/>
          </FormView>
        </FormCard>
      </FormProvider>
    </DefaultIndexContainer>
  );
}