import { Images } from "../../assets/images"
import ControllerInput from "../../components/controller-form/controller-input"
import { useForm, Control, type FieldValues } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../../components/ui/Button"
import loginSchema, { login } from "../../components/schema/LoginSchema"

export const Login = () => {
  const { handleSubmit, formState: { errors }, control } = useForm<login>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
   

  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className='flex h-screen   items-center w-screen justify-center overflow-hidden bg-no-repeat '
      style={{
        backgroundImage: `url(${Images.bg})`,
        backgroundSize:'100% 100%'
      }}>
      <div>
        <form className="px-[30px] z-[99999999] w-[350px] min-h-[550px] rounded-[20px] bg-white blur-[100px] flex flex-col justify-center "
          style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.15)' }}
          onSubmit={onSubmit}
        >
          <div className="flex w-full justify-center items-center mt-[50px] mb-[20px]">
            <img src={Images.logo} alt="logo-flag" className="w-[150px] h-[150px] object-cover" />
          </div>
          <div className="mb-[20px] h-[80px] w-full flex-col  flex  justify-center  ">
            <ControllerInput
              name="email"
              control={control as unknown as Control<FieldValues>}
              label="Email"
              required
              className=" flex flex-col justify-center !border-green1 !border-[2px]"
              placeholder="Nhập email của bạn"
            />
            {errors.email?.message && <span className="text-error font-fontFamily text-[14px] mt-[3px]">{errors.email.message}</span>}
          </div>
          <div className="w-full h-[80px]  flex flex-col justify-center  ">
            <ControllerInput
              name="password"
              control={control as unknown as Control<FieldValues>}
              label="Mật khẩu"
              required
              className=" flex flex-col  justify-center  hover:border-green1"
              placeholder="Nhập mật khẩu"
              type="password"
            />
            {errors.password?.message && <span className="text-error w-full  j font-fontFamily text-[14px] mt-[3px]">{errors.password.message}</span>}
          </div>
          <div className='flex justify-between mt-[10px]'>
            <button className="border-none bg-transparent text-[14px] font-[500] text-green1">Hỗ trợ</button>
            <button className="border-none cursor-pointer bg-transparent text-[14px] font-[500] text-green1">Quên mật khẩu</button>
          </div>
          <Button size='lg' className="text-[17.5px] font-fontFamily cursor-pointer text-white font-[500] uppercase items-center justify-center bg-green1 rounded-[6px] min-w-[350px] border-none flex m-auto mt-[30px]">
            đăng nhập
          </Button>

        </form>
      </div>
    </div>
  )
}
