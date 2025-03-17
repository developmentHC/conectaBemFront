"use client"

import { TextField, TextFieldProps } from "@mui/material"
import { ChangeEvent, forwardRef } from "react"

const formatCEP = (str: string) => {
  const numbers = str.replace(/\D/g, '').slice(0, 8)

  return numbers
    .replace(/^(\d{5})(\d)/, '$1-$2')
}

export const CEPField = forwardRef(({
  defaultValue,
  onChange,
  ...props
}: TextFieldProps, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatCEP(e.target.value)
    onChange?.(e)
  }

  return (
    <TextField 
      defaultValue={!defaultValue ? undefined : formatCEP(defaultValue as string)}
      inputRef={ref}
      onChange={handleChange}
      placeholder="XXXXX-XXX"
      {...props}
    />
  )
})

CEPField.displayName = "CEPField"