type FormErrorsType<D extends Record<string, any>> = {
  [P in keyof D]?: string[];
}

export default FormErrorsType;
