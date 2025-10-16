import {styled} from "@/core/styled";
import {T2, TextPropsType} from "@/core/components/Text";
import useFormFieldErrors from "./useFormFieldErrors";

const ErrorText = styled(T2, {
  palette: "errorColor",
  style: {
    marginHorizontal: 8,
  }
});

export default function FieldErrors({name, ...rest}: {name: string} & TextPropsType) {
  const errors = useFormFieldErrors(name);
  return (
    <>
      {errors.map((error, i) =>
        <ErrorText {...rest} key={i} children={error}/>
      )}
    </>
  );
}