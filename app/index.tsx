import {styled, T, Image, Icon, ButtonLink, DeadEnd} from "@/components";


const logoSize = 120;

const Logo = styled(Image, {
  source: require("../assets/images/mote.svg"),
  width: logoSize,
  height: logoSize,
  style: {
    width: logoSize,
    height: logoSize,
  }
});

export default function Index() {
  return (
    <DeadEnd
      splash={<Logo/>}
      header="Mote"
      text="Not Connected"
    >
      <ButtonLink href="/m/">
        <Icon name="HousePlug"/>
        <T>
          Connect
        </T>
      </ButtonLink>
    </DeadEnd>
  );
}
