import { Images } from "../../assets/images"
import ControllerInput from "../../components/controller-form/controller-input"
import { useForm, Control, type FieldValues } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/Button"
import loginSchema, { login } from "../../components/schema/LoginSchema"
import { Select, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { SelectContent } from "../../components/ui/Select"
import i18n from '../../i18n'
import { setLanguageToStorage } from "../../helps";

export const Login = () => {
  const { t } = useTranslation();
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

  const handleChangleLanguage = (lng: string) => {
    console.log(lng)
    setLanguageToStorage(lng)
    i18n.changeLanguage(lng);
  }

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url(${Images.bg})`,

      }}>
      <div className=" absolute top-[20px] right-0">
        <Select onValueChange={handleChangleLanguage}>
          <SelectTrigger className="w-[181px] cursor-pointer">
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
            <button type="button" className="border-none cursor-pointer bg-transparent text-[14px] font-[500] text-green1">{t("login.resetPassword")}</button>
          </div>
          <Button size='lg' className="text-[17.5px] font-fontFamily cursor-pointer text-white font-[500] uppercase items-center justify-center bg-green1 rounded-[6px] min-w-[350px] border-none flex m-auto mt-[30px]">
            {t("login.login")}
          </Button>

        </form>
      </div>
    </div>
  )
}
