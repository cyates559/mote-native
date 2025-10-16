import {useCallback} from "react";
import {
  DefaultIndexContainer,
  FormView,
  T,
  DebouncedTextInput,
  useSubscriptions,
  Code,
  useStoredState,
  TextInput,
  useEventListener,
  SubTheme,
  FormCard,
  Field,
  FormProvider,
  useLiveStoredFormController, FormControllerType, useRetain, LoadingOverlay, useCommand, useSpray
} from "@/core";


type TopicAndMessage = {topic: string; message: string;};


function Subscriber() {
  const [topic, setTopic] = useStoredState("debug.subscriber.topic");
  const messages = useSubscriptions(topic? [topic]: []);
  return (
    <FormCard header="Subscribe">
      <FormView>
        <T children="Topic:"/>
        <DebouncedTextInput icon="Paperclip" value={topic} setValue={setTopic} placeholder="device/+/name"/>
        <T children="Messages:"/>
        <Code children={JSON.stringify(messages[0], null, 2)}/>
      </FormView>
    </FormCard>
  );
}

function Retainer() {
  const request = useRetain();
  const onSubmit = useCallback(({store: {topic, message}}: FormControllerType<TopicAndMessage>) => {
    request.send(topic, message);
  }, [request.send]);
  const form = useLiveStoredFormController({key: "debug.form.retainer", defaultData: {topic: "", message: ""}, onSubmit});
  return (
    <FormProvider value={form}>
      <FormCard header="Retain" rightButton={{onPress: form.submit, icon: "Save"}}>
        <FormView>
          <T children="Topic:"/>
          <Field type={TextInput} name="topic" icon="Paperclip" placeholder="device/aphrodite/name" onSubmitEditing={form.submit}/>
          <T children="Message:"/>
          <Field type={TextInput} name="message" placeholder="" onSubmitEditing={form.submit}/>
        </FormView>
        {request.loading && <LoadingOverlay/>}
      </FormCard>
    </FormProvider>
  );
}

function Commander() {
  const request = useCommand();
  const onSubmit = useCallback(({store: {topic, message}}: FormControllerType<TopicAndMessage>) => {
    request.send(topic, message);
  }, [request.send]);
  const form = useLiveStoredFormController({key: "debug.form.commander", defaultData: {topic: "", message: ""}, onSubmit});
  return (
    <FormProvider value={form}>
      <FormCard header="Send Command" rightButton={{onPress: form.submit, icon: "SendHorizontal"}}>
        <FormView>
          <T children="Topic:"/>
          <Field type={TextInput} name="topic" icon="Paperclip" placeholder="device/aphrodite/role/power/command/off" onSubmitEditing={form.submit}/>
          <T children="Params:"/>
          <Field type={TextInput} name="message" placeholder="" onSubmitEditing={form.submit}/>
        </FormView>
        {request.loading && <LoadingOverlay/>}
      </FormCard>
    </FormProvider>
  );
}

function EventListener() {
  const [topic, setTopic] = useStoredState("debug.event-listener.topic");
  return (
    <FormCard header="Listen">
      <FormView>
        <T children="Topic:"/>
        <DebouncedTextInput value={topic} icon="Paperclip" setValue={setTopic} placeholder="device/+/name"/>
        <T children="Messages:"/>
        {topic?
          <EventListenerMessages topic={topic}/>:
          <SubTheme theme="Secondary">
            <Code children="No Messages..."/>
          </SubTheme>
        }
      </FormView>
    </FormCard>
  );
}

function EventListenerMessages({topic}: {topic: string}) {
  const messages = useEventListener(topic);
  return (
    <Code children={messages && messages.length > 0?
      messages.reduce((result, message) => result + (typeof message === "string"?
          message: JSON.stringify(message)) + "\n",
        ""
      ):
      "No messages..."
    }/>
  );
}

function EventCreator() {
  const request = useSpray();
  const onSubmit = useCallback(({store: {topic, message}}: FormControllerType<TopicAndMessage>) => {
    if(topic) {
      request.send(topic, message);
    }
  }, [request.send]);
  const form = useLiveStoredFormController({key: "debug.form.event-creator", defaultData: {topic: "", message: ""}, onSubmit});
  return (
    <FormProvider value={form}>
      <FormCard header="Create Event" rightButton={{onPress: form.submit, icon: "Send"}}>
        <FormView>
          <T children="Topic:"/>
          <Field type={TextInput} name="topic" icon="Paperclip" placeholder="device/aphrodite/event/wake" onSubmitEditing={form.submit}/>
          <T children="Params:"/>
          <Field type={TextInput} name="message" placeholder="" onSubmitEditing={form.submit}/>
        </FormView>
      </FormCard>
      {request.loading && <LoadingOverlay/>}
    </FormProvider>
  );
}

export default function DebugTools() {
  return (
    <DefaultIndexContainer>
      <Subscriber/>
      <Retainer/>
      <Commander/>
      <EventListener/>
      <EventCreator/>
    </DefaultIndexContainer>
  );
}