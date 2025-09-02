import {
  styled,
  RouteOptionPropsType, DefaultFigureButtonLink,
  BackgroundView, Icon, Button,
} from "@/core";
import DenonAVRDeviceType from "./types/DenonAVRDeviceType";

const DenonAVRFigureButtonControlsView = styled(BackgroundView, {
  style: {
    alignSelf: "flex-end",
    borderRadius: "50%",
    overflow: "hidden",
  },
});

const DenonAVRPowerButton = styled(Button, {
  compact: true,
  style: {
    padding: 5,
  },
});

export default function DenonAVRDeviceFigureButtonLink({option}: RouteOptionPropsType) {
  const {togglePower, isOn} = option as DenonAVRDeviceType;
  return (
    <DefaultFigureButtonLink option={option}>
      <DenonAVRFigureButtonControlsView>
        <DenonAVRPowerButton onPress={togglePower} selected={isOn}>
          <Icon name="Power"/>
        </DenonAVRPowerButton>
      </DenonAVRFigureButtonControlsView>
    </DefaultFigureButtonLink>
  );
}