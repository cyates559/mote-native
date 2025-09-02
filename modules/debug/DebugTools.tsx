import {
  Card,
  DefaultIndexContainer, FormView,
  H,
  Row,
  styled, T, TextInput, DebouncedTextInput, useSubscriptions,
} from "@/core";
import {useStoredState} from "@/core";



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

const MessageBox = styled(TextInput, {
  multiline: true,
  scrollEnabled: false,
  style: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
})


function Subscriber() {
  const defaultTopic = "device/+/name";
  const [topic, setTopic] = useStoredState(defaultTopic);
  const messages = useSubscriptions(topic? [topic]: []);
  return (
    <DebugControl>
      <DebugControlHeader children="Subscribe"/><T/>
      <Row>
        <FormView>
          <T children="Test:"/>
          <DebouncedTextInput value={topic} setValue={setTopic} placeholder={defaultTopic}/>
          <T children="Other Test:"/>
          <MessageBox value={JSON.stringify(messages[0], null, 2)}/>
        </FormView>
      </Row>
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