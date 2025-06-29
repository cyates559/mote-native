import { useMemo } from "react";
import {styled, StyleSheet} from "@/core/styled";
import T, {TextPropsType} from "./T";

export type HKeyType = 1 | 2 | 3 | 4 | 5 | 6;

const sizeMap: Record<HKeyType, number> = {
  1: 48,
  2: 36,
  3: 32,
  4: 24,
  5: 20,
  6: 16,
};

export default function H({h, style, ...rest}: TextPropsType & {h?: HKeyType}) {
  const sheet = useMemo(() => StyleSheet .flatten([style, {fontSize: (h && sizeMap[h])?? 16}]), [h, style]);
  return <T {...rest} style={sheet}/>
}

export const H1 = styled(H, {h: 1});
export const H2 = styled(H, {h: 2});
export const H3 = styled(H, {h: 3});
export const H4 = styled(H, {h: 4});
export const H5 = styled(H, {h: 5});
export const H6 = styled(H, {h: 6});
