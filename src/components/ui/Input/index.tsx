import { type ComponentPropsWithoutRef, forwardRef, useState, useCallback } from "react"
import { EyeIcon, EyeStash } from "../../../assets/icons/eye"

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  ({ className, type, ...props }, ref) => {
    const [eye, setEye] = useState<boolean>(false)

    const handleChangeEye = useCallback(() => {
      setEye(!eye)
    }, [eye])

    const classNameEye = 'w-5 h-5 absolute top-[25%] right-[7px] cursor-pointer  translate-y-[-50%]'
    const checkEye = eye ? <EyeIcon className={classNameEye} onClick={handleChangeEye} /> : <EyeStash className={classNameEye} onClick={handleChangeEye} />
    return (
      <div className={className + " relative"}>
        <input
          type={eye ? 'text' : type}
          className={
            "h-[35px]  rounded-md  px-[5px] !text-[15px] outline-none   " +
            className
          }
          placeholder={props.placeholder}
           {...props}
           ref={ref}
        />
        {type === "password" && checkEye}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }


