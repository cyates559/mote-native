import {useMemo, useState} from "react";
import {levenshteinSort} from "@/core/utils";
import SortSelect, {SortSelectPropsType, DefaultSelectPropsType} from "./SortSelect";


export type SelectPropsType<T> = SortSelectPropsType<T> | DefaultSelectPropsType<T>;

export function DefaultSelect<T>({children=[], ...rest}: DefaultSelectPropsType<T>) {
  const [searchValue, setSearchValue] = useState<string | null>("");
  const sorted = useMemo(() => searchValue?
    levenshteinSort(searchValue.toLowerCase(), children, ({props}) => props.children.toLowerCase())
  :children, [searchValue, children]);
  return <SortSelect {...rest} searchValue={searchValue} setSearchValue={setSearchValue} children={sorted}/>;
}

export default function Select<T>(props: SelectPropsType<T>) {
  if(props.hasOwnProperty("search")) {
    return <SortSelect {...props as SortSelectPropsType<T>}/>
  } else {
    return <DefaultSelect {...props}/>
  }
}