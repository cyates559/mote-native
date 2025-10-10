import {ReactElement} from "react";
import OptionPropsType from "@/core/components/ChoiceInput/types/OptionPropsType";

type OptionType<T=any> = ReactElement<OptionPropsType<T>>;

export default OptionType;
