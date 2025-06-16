import {ReactNode} from "react"
import {styled, View, ViewProps, ThemeType} from "@/styled";
import H from "./H";
import Spinner from "./Spinner";
import Icon, {IconNameType} from "./Icon";
import T from "./T";

export interface DeadEndPropsType extends ViewProps {
  loading?: boolean;
  splash?: ReactNode;
  header?: ReactNode;
  text?: ReactNode;
  children?: ReactNode;
  icon?: IconNameType;
}

const CenteredView = styled(View, {
  style: {
    alignItems: "center",
    justifyContent: "center",
  },
})


export const DeadEndView = CenteredView.styled({
  style: ({backgroundColor}: ThemeType) => ({
    borderRadius: 5,
    flex: 1,
    backgroundColor,
    gap: 12,
    padding: 24,
  }),
});

export const DeadEndHeader = styled(H, {
  h: 2,
  style: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export const DeadEndActions = CenteredView.styled({
  style: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export const DeadEndSpinner = Spinner.styled({
  size: "large",
});


export default function DeadEnd(props: DeadEndPropsType) {
  const {loading, splash, icon, header, text, children, ...rest} = props;
  return (
    <DeadEndView {...rest}>
      {loading && <DeadEndSpinner/>}
      {splash}
      {icon && <Icon name={icon}/>}
      {header && <DeadEndHeader children={header}/>}
      {text && <T>{text}</T>}
      {children && <DeadEndActions children={children}/>}
    </DeadEndView>
  )
}