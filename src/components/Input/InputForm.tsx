import { UseFormRegister } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useState } from 'react'
interface InputType {
  classNameLabel?: string
  type?: string
  className: string
  placeholder?: string
  name: string,
  errorMessage: string,
  classNameDiv?: string
  labelTitle?: string
  value?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  obligatory?: string
}

export const InputForm = ({
  type,
  className,
  classNameDiv,
  placeholder,
  errorMessage,
  classNameLabel,
  labelTitle,
  register,
  obligatory,
  name, value
}: InputType) => {
  const [displayPassword, setDisplayPassword] = useState<boolean>(false)
  return <div className={classNameDiv} >
    <label htmlFor="" className={classNameLabel ? classNameLabel : 'text-black relative  text-[16px] font-[400] leading-[24px] mb-[5px] block font-Roboto'} >{labelTitle}<span className='text-[red]'>{obligatory}</span></label>
    <div className='w-full relative'>
      <input type={type && !displayPassword ? type : 'text'} className={className} {...register(name)} name={name} placeholder={placeholder} value={value} />
      {
        type === 'password' && <div className='right-[15px] top-[50%] translate-y-[-50%] absolute cursor-pointer' >{displayPassword ? <BsEye size={25} onClick={() => setDisplayPassword(false)} /> : <BsEyeSlash size={25} onClick={() => setDisplayPassword(true)} />} </div>
      }
    </div>
    {
      errorMessage && <span className='text-[15px] font-Roboto text-[red]'>{errorMessage}</span>
    }
  </div>
}
