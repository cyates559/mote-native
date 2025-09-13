import {
  Card,
  DefaultIndexContainer, FormView,
  H,
  styled, T, TextInput, DebouncedTextInput, useSubscriptions, Code,
} from "@/core";
import {useStoredState, View, ScrollView} from "@/core";



const DebugControl = styled(Card, {
  style: {
    padding: 16,
    gap: 8,
    flexGrow: 1,
  }
});

const DebugControlHeader = styled(H, {
  h: 4,
  style: {
    alignSelf: "center",
  }
});

function Subscriber() {
  const defaultTopic = "device/+/name";
  const [topic, setTopic] = useStoredState(defaultTopic);
  const messages = useSubscriptions(topic? [topic]: []);
  return (
    <DebugControl>
      <DebugControlHeader children="Subscribe"/>
      <FormView>
        <T children="Topic:"/>
        <DebouncedTextInput value={topic} setValue={setTopic} placeholder={defaultTopic}/>
        <T children="Messages:"/>
        <Code children={JSON.stringify(messages[0], null, 2)}/>
      </FormView>
    </DebugControl>
  );
}


export default function DebugTools() {
  return (
    <DefaultIndexContainer>
      <Subscriber/>
    </DefaultIndexContainer>
  );
}