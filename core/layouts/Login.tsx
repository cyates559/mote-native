import {MoteLogo, T, Icon, ButtonLink, DeadEnd} from "@/core/components";


export default function Login() {
  return (
    <DeadEnd
      splash={<MoteLogo/>}
      header="Mote"
      text="Not Connected"
    >
      <ButtonLink accent filled pill href="/m/" hrefMode="replace">
        <Icon name="HousePlug"/>
        <T>
          Connect
        </T>
      </ButtonLink>
    </DeadEnd>
  );
}
