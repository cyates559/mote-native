import {
  styled,
  RouteOptionPropsType, DefaultFigureButtonLink,
  BackgroundView, Icon, Button,
} from "@/core";
import RokuDeviceType from "@/modules/roku/types/RokuDeviceType";

const RokuFigureButtonControlsView = styled(BackgroundView, {
  style: {
    alignSelf: "flex-end",
    borderRadius: "50%",
    overflow: "hidden",
  },
});

const RokuPowerButton = styled(Button, {
  compact: true,
  style: {
    padding: 5,
  },
});

export default function RokuFigureButtonLink({option}: RouteOptionPropsType) {
  const {togglePower, isConnected} = option as RokuDeviceType;
  return (
    <DefaultFigureButtonLink option={option}>
      <RokuFigureButtonControlsView>
        <RokuPowerButton onPress={togglePower} selected={isConnected}>
          <Icon name="Power"/>
        </RokuPowerButton>
      </RokuFigureButtonControlsView>
    </DefaultFigureButtonLink>
  );
}