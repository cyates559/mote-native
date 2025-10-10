import {Themes, ViewPropsType} from "@/core/styled";
import {StyledBorderedBackgroundView} from "../View";

export default function MenuCard(props: ViewPropsType) {
  return (
    <Themes.Menu children={
      <StyledBorderedBackgroundView {...props}/>
    }/>
  );
}
