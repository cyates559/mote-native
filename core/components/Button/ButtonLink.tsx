import useHrefOnPress from "./useHrefOnPress";
import Button, {ButtonPropsType} from "./Button";
import {HrefPropsType} from "./types";

export type ButtonLinkPropsType = ButtonPropsType & HrefPropsType;

export default function ButtonLink({href, hrefMode, ...props}: ButtonLinkPropsType) {
  return <Button onPress={useHrefOnPress({href, hrefMode})} {...props}/>
}

ButtonLink.rejectRef = true;
