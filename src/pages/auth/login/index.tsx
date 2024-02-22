import { Link, useNavigate } from 'react-router-dom';
import { useForm, Control, type FieldValues } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next";
import { useEffect, useState, useContext } from 'react';

import { Button } from "../../../components/ui/button"
import AuthSchema, { type AuthSchemaType } from "../../../components/schema/login"
import { Images } from "../../../assets/images"
import ControllerInput from "../../../components/controller-form/controller-input"
import { useLoginMutation } from '../../../apis';
import { ContextAPI } from '../../../hooks';
import { ErrorHandle } from '../../../types/login';
import { Loading } from '../../../assets/icons/eye';
import { PAGE } from '../../../contants';




export const Login = () => {

  const { setAuth } = useContext(ContextAPI)
  const { t } = useTranslation();
  const loginSchema = AuthSchema.omit({ name: true, confirm_password: true, forgot_password_token: true })
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const navigate = useNavigate()
  const [Login, { isLoading }] = useLoginMutation()
  const { handleSubmit, formState: { errors }, control, watch, setError } = useForm<Omit<AuthSchemaType, 'username' | 'confirm_password' | 'forgot_password_token'>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {

      const res = await Login(data).unwrap()
      setAuth({
        role: res.data.user.roles[0],
        auth: true
      })
      navigate(PAGE.HOME)
    } catch (error) {
      const e = error as ErrorHandle
      for (const key in e.data.error) {
        setError(key as 'email' | 'password', { message: e.data.error[key] })
      }
    }
  })
  const handleNavigateConfirmEmail = () => {
    navigate(PAGE.CONFIRM_PASSWORD)
  }

  useEffect(() => {
    watch((value) => {
      value.email && value.email.length > 0
        && value.password &&
        value.password.length ? setIsDisable(true) : setIsDisable(false)
    })
  }, [watch])

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url(${Images.background})`,
      }}>

      <div>
        <form className="px-[30px] z-[99999999] w-[400px] min-h-[530px] rounded-[20px] bg-white blur-[100px] flex flex-col justify-center "
          style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.15)' }}
          onSubmit={onSubmit}
        >
          <div className="flex w-full justify-center items-center mb-[10px]">
            <img src='https://logos-world.net/wp-content/uploads/2020/05/Tampa-Bay-Lightning-Logo.png' alt="logo-flag" className="w-full h-full object-cover" />
          </div>
          <div className="mb-[10px] h-[80px] w-full flex-col  flex  justify-center  ">
            <ControllerInput
              name="email"
              control={control as unknown as Control<FieldValues>}
              label="Email"
              required
              className=" flex flex-col justify-center"
              placeholder={t("login.enterEmail")}
            />
            {errors.email?.message && <span className="text-error font-fontFamily text-[14px] mt-[3px]">{t(errors.email.message)}</span>}
          </div>
          <div className="w-full h-[80px]  flex flex-col justify-center  ">
            <ControllerInput
              name="password"
              control={control as unknown as Control<FieldValues>}
              label={t("login.password")}
              required
              className=" flex flex-col  justify-center  hover:border-green1"
              placeholder={t("login.enterPassword")}
              type="password"
            />
            {errors.password?.message && <span className="text-error w-full  j font-fontFamily text-[14px] mt-[3px]">{t(errors.password.message)}</span>}
          </div>
          <div className='flex justify-between mt-[10px]'>
            <button type="button" className="border-none bg-transparent text-[14px] font-[500] text-green1">{t("login.support")}</button>
            <button type="button" onClick={handleNavigateConfirmEmail} className="border-none cursor-pointer bg-transparent text-[14px] font-[500] text-green1">{t("login.resetPassword")}</button>
          </div>
          <Button size='lg' className={`text-[17.5px] font-fontFamily cursor-pointer text-white font-[500] uppercase items-center justify-center bg-green1 rounded-[6px] min-w-[350px] border-none flex m-auto mt-[30px] ${isDisable ? ' cursor-pointer' : '!cursor-not-allowed  opacity-[0.3]'}`} disabled={!isDisable}>
            {isLoading ? <Loading /> : t("login.login")}
          </Button>
          <div className='w-full flex items-center justify-center mb-[10px]'>
            <div className='text-[16px] font-fontFamily text-black mr-[5px]'>{t("register.returnPage")}</div>
            <Link to={PAGE.REGISTER} className='text-[18px] font-fontFamily no-underline  text-[red]'> {t('register.register')}</Link>
          </div>
        </form>

      </div>
    </div>
  )
}
