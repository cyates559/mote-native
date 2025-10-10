import {denonAVRDevicesKey} from "./keys";
import {
  Button,
  Leaf,
  Icon,
  Loading,
  T,
  useModuleRouter,
  useStore,
} from "@/core";
import RokuDeviceType from "@/modules/roku/types/RokuDeviceType";


export default function DenonAVRDevice() {
  const {nodeId, title} = useModuleRouter();
  const avrDevices = useStore<Record<string, RokuDeviceType>>(denonAVRDevicesKey);
  if(avrDevices === null) {
    return <Loading text="Loading AVR Device..."/>;
  }
  const avrDevice = avrDevices[nodeId];
  if(!avrDevice) {
    return <Leaf text={`AVR Device (${nodeId}) not found!`} icon="SearchX"/>;
  }
  const {isConnected, actions} = avrDevice;
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
    <Leaf splash header={avrDevice.title}>
      <T children={JSON.stringify(avrDevice, null, 2)}/>
    </Leaf>
  );
};