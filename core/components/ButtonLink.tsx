import Button, {ButtonPropsType} from "@/core/components/Button";
import {HrefPropsType} from "@/core/components/BaseButtonLink";
import useHrefOnPress from "@/core/components/useHrefOnPress";

export type ButtonLinkPropsType = ButtonPropsType & HrefPropsType;

export default function ButtonLink({href, hrefMode, ...props}: ButtonLinkPropsType) {
  return <Button onPress={useHrefOnPress({href, hrefMode})} {...props}/>
}

ButtonLink.rejectRef = true;
