import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const formatCpfCnpj = (str: string) => {
  const numbers = str.replace(/\D/g, "");

  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  
  return numbers
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
};

export const CpfCnpjField = forwardRef(
  ({ defaultValue, onChange, ...props }: TextFieldProps, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = formatCpfCnpj(e.target.value);
      onChange?.(e);
    };

    return (
      <TextField
        placeholder="XX.XXX.XXX/0001-XX"
        defaultValue={
          !defaultValue ? undefined : formatCpfCnpj(defaultValue as string)
        }
        inputRef={ref}
        onChange={handleChange}
        required
        {...props}
      />
    );
  }
);

CpfCnpjField.displayName = "CpfCnpjField"