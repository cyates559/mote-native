import {MoteLogo, T, Icon, ButtonLink, Leaf} from "@/core/components";
import {SafeAreaView} from "react-native";


export default function Login() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Leaf
        splash={<MoteLogo/>}
        header="Mote"
        text="You are not connected"
      >
        <ButtonLink theme="AccentCard" href="/m/" hrefMode="replace">
          <Icon name="HousePlug"/>
          <T>
            Connect
          </T>
        </ButtonLink>
      </Leaf>
    </SafeAreaView>
  );
}
