import {Href, router} from "expo-router";
import Button, {ButtonPropsType} from "@/components/Button";
import {useCallback} from "react";

export default function ButtonLink({href, ...props}: {href: Href} & ButtonPropsType) {
  const onPress = useCallback(() => router.push(href), [href]);
  return <Button onPress={onPress} {...props}/>
}
