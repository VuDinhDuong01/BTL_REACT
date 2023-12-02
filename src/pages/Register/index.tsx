/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, Control, type FieldValues } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next";
import {  ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from "../../components/ui/Button"
import AuthSchema, { type AuthSchemaType } from "../../components/schema/LoginSchema"
import { Select, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { SelectContent } from "../../components/ui/Select"
import i18n from '../../i18n'
import { Images } from "../../assets/images"
import ControllerInput from "../../components/controller-form/controller-input"
import { setAccessTokenToLS, setLanguageToLS, setRefreshTokenToLS } from "../../helps";
import { regex } from '../../helps/regex';
import { PAGE } from '../../contants';
import { useRegisterMutation } from '../../apis';

export const Register = () => {
  const navigate= useNavigate()
  const { t } = useTranslation();
  const [register,{isLoading}]= useRegisterMutation()
  const { handleSubmit, formState: { errors }, control } = useForm<AuthSchemaType>({
    defaultValues: {
      email: '',
      password: '',
      name: ''
    },
    resolver: zodResolver(AuthSchema),
  })
  const onSubmit = handleSubmit(async(data) => {
    try{
      const res= await register(data).unwrap()
      setAccessTokenToLS(res.data.access_token)
      setRefreshTokenToLS(res.data.refresh_token)
      // navigate(PAGE.LOGIN)
    }catch(error){
      console.log(error)
    }
  })

  const handleChangleLanguage = (lng: string) => {
    setLanguageToLS(lng)
    i18n.changeLanguage(lng);
  }

  const handleBlockSpace = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(regex.blockSpace, '')
  }

  return (
    <div className='flex h-[100vh] w-[100%]  flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url(${Images.background})`,
      }}>
      <div className=" absolute top-[20px] right-[30px]">
        <Select onValueChange={handleChangleLanguage}>
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder={localStorage.getItem("lng") === 'vi' ? 'Tiếng Việt' : 'English'}
            />
          </SelectTrigger>
          <SelectContent className="z-[9999] bg-white w-full mt-[5px] ">
            <SelectItem value="vi" className="hover:bg-green1 hover:text-white">Tiếng Việt</SelectItem>
            <SelectItem value="en" className="hover:bg-green1 hover:text-white">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <form className="px-[30px] z-[99999999] w-[350px] min-h-[650px] rounded-[20px] bg-white blur-[100px] flex flex-col justify-center "
          style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.15)' }}
          onSubmit={onSubmit}
        >
          <div className="flex w-full justify-center items-center mt-[50px] mb-[20px]">
            <img src={Images.logo} alt="logo-flag" className="w-[150px] h-[150px] object-cover" />
          </div>
          <div className="w-full h-[120px]  flex flex-col justify-center  ">
            <ControllerInput
              name="name"
              control={control as unknown as Control<FieldValues>}
              label={t("register.username")}
              required
              className=" flex flex-col  justify-center  hover:border-green1"
              placeholder={t("register.enterUsername")}
              onInput={handleBlockSpace}
            />
            {errors.name?.message && <span className="text-error w-full  j font-fontFamily text-[14px] mt-[3px]">{t(errors.name.message)}</span>}
          </div>
          <div className="mb-[20px] h-[80px] w-full flex-col  flex  justify-center  ">
            <ControllerInput
              name="email"
              control={control as unknown as Control<FieldValues>}
              label="Email"
              required
              className=" flex flex-col justify-center !border-green1 !border-[2px]"
              placeholder={t("login.enterEmail")}
              onInput={handleBlockSpace}
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
              onInput={handleBlockSpace}
            />
            {errors.password?.message && <span className="text-error w-full  j font-fontFamily text-[14px] mt-[3px]">{t(errors.password.message)}</span>}
          </div>
          <Button size='lg' className="text-[17.5px] font-fontFamily cursor-pointer text-white font-[500] uppercase items-center justify-center bg-green1 rounded-[6px] min-w-[350px] border-none flex m-auto mt-[30px]">
            {t("register.register")}
          </Button>
        </form>
      </div>
    </div>
  )
}

