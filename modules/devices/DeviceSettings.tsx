import {SetStateAction, useCallback, useMemo} from "react";
import {rolesKey} from "./keys";
import {
  T, H5,
  useStore,
  useModuleRouter,
  Loading,
  Button,
  Icon, Leaf, styled, Checkbox, View,
} from "@/core";
import DeviceType from "@/modules/devices/types/DeviceType";
import RoleType from "@/modules/devices/types/RoleType";
import useDevices from "@/modules/devices/types/useDevices";

export default function DeviceSettings() {
  const devices = useDevices();
  if (devices === null) {
    return (
      <Loading>
        Loading Device...
      </Loading>
    );
  } else return <DeviceSettingsView devices={devices}/>
}

function DeviceHeader({device}: {device: DeviceType}) {
  return (
    <>
      {device.title? device.title: device.nodeId}
      {"\n"}
      {device.isConnected?
        <T>
          {device.type}: {device.title? device.nodeId: ""} {device.hostname? "(" + device.hostname + ") ": ""}
          {device.mac && `[${device.mac}] `}
        </T>:
        <T>
          {device.type}: {device.title? device.nodeId: ""} - Not Connected - last connection:
          {"\n"}
          {device.hostname? "(" + device.hostname + ") ": ""}
          {device.mac && `[${device.mac}] `}
        </T>
      }
    </>
  )
}

const Container = styled(Leaf, {
  outerStyle: {
  },
  style: {
    justifyContent: "flex-start",
  },
  innerStyle: {
    gap: 24,
  },
});

const ButtonContainer = styled(View, {
  style: {
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 16,
  },
});

const ButtonContainerView = styled(View, {
  style: {
    gap: 6,
  }
});

const ButtonContainerHeader = styled(H5, {
  style: {
    alignSelf: "flex-start",
  }
});

function DeviceSettingsView({devices}: {devices: Record<string, DeviceType>}) {
  const {nodeId, dismiss} = useModuleRouter();
  const device = devices[nodeId];
  const onRename = useCallback(() => {
    const newName = prompt("Device name:", device.title);
    if (newName !== null && newName.length > 0) {
      device.rename(newName);
    }
  }, [device.title, device.rename]);
  const onDelete = useCallback(() => {
    if (window.confirm("Are you sure you want to delete this device?")) {
      setTimeout(() => device.delete(), 0);
      dismiss();
    }
  }, [device.delete]);
  return (
    <Container header={<DeviceHeader device={device}/>}>
      <ButtonContainer>
        <ButtonContainerHeader children="Actions: "/>
        <ButtonContainerView>
          {device.isConnected ?
            <>
              {device.off &&
                <Button theme="AccentCard" onPress={device.off}>
                  <Icon name="Power"/>
                  <T children="Power off"/>
                </Button>
              }
              {device.reboot &&
                <Button theme="AccentCard" onPress={device.reboot}>
                  <Icon name="RotateCcw"/>
                  <T children="Reboot"/>
                </Button>
              }
              {device.sleep &&
                <Button theme="AccentCard" onPress={device.sleep}>
                  <Icon name="MoonStar"/>
                  <T children="Sleep"/>
                </Button>
              }
              {device.upgrade &&
                <Button theme="AccentCard" onPress={device.upgrade}>
                  <Icon name="SquareArrowUp"/>
                  <T children="Upgrade"/>
                </Button>
              }
              {device.stopService &&
                <Button theme="AccentCard" onPress={device.stopService}>
                  <Icon name="OctagonAlert"/>
                  <T children="Stop Service"/>
                </Button>
              }
              {device.restartService &&
                <Button theme="AccentCard" onPress={device.restartService}>
                  <Icon name="RotateCwSquare"/>
                  <T children="Restart Service"/>
                </Button>
              }
            </> :
            device.wake &&
              <Button theme="AccentCard" onPress={device.wake}>
                <Icon name="SignalHigh"/>
                <T children="Wake"/>
              </Button>
          }
          <Button theme="AccentCard" onPress={onRename}>
            <Icon name="TextCursor"/>
            <T children="Rename"/>
          </Button>
          <Button theme="ErrorCard" onPress={onDelete}>
            <Icon name="Trash"/>
            <T children="Delete"/>
          </Button>
        </ButtonContainerView>
      </ButtonContainer>
      <ButtonContainer>
        <ButtonContainerHeader children="Roles: "/>
        <RoleList device={device}/>
      </ButtonContainer>
    </Container>
  );
}

const RoleCheckbox = styled(Checkbox, {
  theme: "Card",
  style: {
    justifyContent: "flex-start",
  }
});

function RoleList({device}: {device: DeviceType}) {
  const roles = useStore<Record<string, RoleType> | null>(rolesKey);
  if(!roles) {
    return <Loading text="Loading Roles..."/>;
  } else {
    return <RoleListView device={device} roles={roles}/>
  }
}

function RoleListView({device, roles}: {device: DeviceType, roles: Record<string, RoleType>}) {
  const roleIds = useMemo(() => Object.keys(roles).sort((a, b) => {
    const ia = device.roles.includes(a);
    const ib = device.roles.includes(b);
    return ia === ib? 0: ia? -1: 1;
  }), [device.roles, roles]);
  const setRoleEnabled = useCallback((roleId: string, value: SetStateAction<boolean | null>) => {
    if(value instanceof Function) {
      device.setRoleEnabled(roleId, value(device.roles.includes(roleId))?? false);
    } else {
      device.setRoleEnabled(roleId, value?? false);
    }
  }, [device.roles, device.setRoleEnabled]);
  return (
    <ButtonContainerView>
      {roleIds.map((roleId) =>
        <RoleCheckbox key={roleId} value={device.roles.includes(roleId)} setValue={v => setRoleEnabled(roleId, v)}>
          {roles[roleId].name}
        </RoleCheckbox>
      )}
    </ButtonContainerView>
  );
}