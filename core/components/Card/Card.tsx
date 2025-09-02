import {Themes, ViewPropsType} from "@/core/styled";
import {StyledBorderedBackgroundView} from "../View";

export default function Card(props: ViewPropsType) {
  return (
    <Themes.Card children={
      <StyledBorderedBackgroundView {...props}/>
    }/>
  );
}
