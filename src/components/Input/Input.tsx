import { ComponentPropsWithRef } from "react";

type InputProps = ComponentPropsWithRef<"input"> & {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?:string 
}

export const Input = ({ type, className, placeholder, onChange ,value}: InputProps) => {
  return <input type={type} placeholder={placeholder} className={className} onChange={onChange} value={value} />
}
