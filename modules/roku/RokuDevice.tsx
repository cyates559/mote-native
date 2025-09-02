import {rokuDevicesKey} from "./keys";
import {
  Button,
  Leaf,
  Icon,
  Loading,
  View,
  ScrollView,
  Row,
  styled,
  T,
  useModuleRouter,
  useStore,
  IconNameType, ButtonPropsType
} from "@/core";
import RokuDeviceType from "@/modules/roku/types/RokuDeviceType";

const Container = styled(ScrollView, {
  contentContainerStyle: {
    justifyContent: "center",
    gap: 48,
    padding: 32,
    alignItems: "center",
    flexWrap: "wrap",
    alignSelf: "center",
  },
  style: {
    alignSelf: "stretch",
  }
});

const Group = styled(View, {
  style: {
    alignItems: "center",
    gap: 12,
  }
});

const CenteredRow = styled(Row, {
  style: {
    alignItems: "center",
    gap: 12,
  }
});

function RokuActionButton({action, icon, ...rest}: {action: () => void, icon: IconNameType} & ButtonPropsType) {
  return <Button
    theme="Card"
    style={{
      borderRadius: 500,
      paddingVertical: 12,
      paddingHorizontal: 12,
    }}
    onPress={action}
    children={<Icon name={icon}/>}
    {...rest}
  />;
}


export default function RokuDevice() {
  const {nodeId, title} = useModuleRouter();
  const rokuDevices = useStore<Record<string, RokuDeviceType>>(rokuDevicesKey);
  if(rokuDevices === null) {
    return <Loading children="Loading Roku Device..."/>;
  }
  const rokuDevice = rokuDevices[nodeId];
  if(!rokuDevice) {
    return <Leaf text={`Roku Device (${nodeId}) not found!`} icon="SearchX"/>;
  }
  const {isConnected, actions} = rokuDevice;
  if(!isConnected) {
    return (
      <Leaf icon="Signal" header={`${title} Roku is Offline`}>
        <Button theme="AccentCard" onPress={actions.on}>
          <Icon name="Power"/>
          <T children="Power On"/>
        </Button>
      </Leaf>
    );
  }
  return (
    <Leaf splash header={rokuDevice.title}>
      <Container>
        <Group>
          <RokuActionButton theme="ErrorCard" action={actions.off} icon="Power"/>
        </Group>
        <Group>
          <CenteredRow>
            <RokuActionButton action={actions.volume_down} icon="Volume1"/>
            <RokuActionButton action={actions.volume_up} icon="Volume2"/>
          </CenteredRow>
        </Group>
        <Group>
          <RokuActionButton action={actions.up} icon="ArrowUp"/>
          <CenteredRow>
            <RokuActionButton action={actions.left} icon="ArrowLeft"/>
            <RokuActionButton theme="AccentCard" action={actions.select} icon="CornerDownLeft"/>
            <RokuActionButton action={actions.right} icon="ArrowRight"/>
          </CenteredRow>
          <RokuActionButton action={actions.down} icon="ArrowDown"/>
        </Group>
        <Group>
          <CenteredRow>
            <RokuActionButton action={actions.back} icon="Delete"/>
            <RokuActionButton action={actions.home} icon="House"/>
            <RokuActionButton action={actions.info} icon="BadgeInfo"/>
          </CenteredRow>
        </Group>
      </Container>
    </Leaf>
  );
};