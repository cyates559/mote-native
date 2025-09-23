import {
  Card,
  DefaultIndexContainer, FormView,
  H,
  styled, T, DebouncedTextInput, useSubscriptions, Code, Button, Icon, Row, useStoredState, View, ScrollView, useMote,
  TextInput, useEventListener, SubTheme
} from "@/core";
import {ReactNode, useCallback} from "react";
import {FormCard} from "@/core/components/FormCard";


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
  const {retain} = useMote();
  const [topic, setTopic] = useStoredState("debug.retainer.topic");
  const [message, setMessage] = useStoredState("debug.retainer.message");
  const onPress = useCallback(() => {
    if(topic) {
      retain(topic, message);
    }
  }, [topic, message])
  return (
    <FormCard header="Retain" rightButton={{onPress, icon: "Save"}}>
      <FormView>
        <T children="Topic:"/>
        <TextInput value={topic} setValue={setTopic} icon="Paperclip" placeholder="device/aphrodite/name"/>
        <T children="Message:"/>
        <TextInput value={message} setValue={setMessage} placeholder=""/>
      </FormView>
    </FormCard>
  );
}

function Commander() {
  const {command} = useMote();
  const [topic, setTopic] = useStoredState("debug.commander.topic");
  const [message, setMessage] = useStoredState("debug.commander.message");
  const onPress = useCallback(() => {
    if(topic) {
      command(topic, message);
    }
  }, [topic, message])
  return (
    <FormCard header="Send Command" rightButton={{onPress, icon: "Send"}}>
      <FormView>
        <T children="Topic:"/>
        <TextInput value={topic} setValue={setTopic} icon="Paperclip" placeholder="device/aphrodite/role/power/command/off"/>
        <T children="Params:"/>
        <TextInput value={message} setValue={setMessage} placeholder=""/>
      </FormView>
    </FormCard>
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
  const {spray} = useMote();
  const [topic, setTopic] = useStoredState("debug.event-creator.topic");
  const [message, setMessage] = useStoredState("debug.event-creator.message");
  const onPress = useCallback(() => {
    if(topic) {
      spray(topic, message);
    }
  }, [topic, message])
  return (
    <FormCard header="Create Event" rightButton={{onPress, icon: "Send"}}>
      <FormView>
        <T children="Topic:"/>
        <TextInput value={topic} icon="Paperclip" setValue={setTopic} placeholder="device/aphrodite/event/wake"/>
        <T children="Params:"/>
        <TextInput value={message} setValue={setMessage} placeholder=""/>
      </FormView>
    </FormCard>
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