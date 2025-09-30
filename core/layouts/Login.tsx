import {Button, Icon, Leaf, MoteLogo, T} from "@/core/components";
import {SafeAreaView} from "react-native";
import {useMote} from "@/core/mote";


export default function Login() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Leaf
        splash={<MoteLogo/>}
        header="Mote"
        text="You are not connected"
      >
        <Button theme="AccentCard" onPress={useMote().connect}>
          <Icon name="HousePlug"/>
          <T children="Connect"/>
        </Button>
      </Leaf>
    </SafeAreaView>
  );
}
