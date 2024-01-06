import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Control, type FieldValues } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

import { Button } from "../../../components/ui/Button"
import AuthSchema, { type AuthSchemaType } from "../../../components/schema/login"
import { Images } from "../../../assets/images"
import ControllerInput from "../../../components/controller-form/controller-input"
import { useResetPasswordMutation } from '../../../apis';
import { ErrorHandle } from '../../../Types/LoginType';
import { Loading } from '../../../assets/icons/eye';
import { PAGE } from '../../../contants';
import { Label } from '../../../components/ui/Lable';


type ErrorKey = 'password' | 'confirm_password'
export const ResetPassword = () => {
    const params = useParams()
    const { user_id } = params
    const { t } = useTranslation();
    const loginSchema = AuthSchema.omit({ name: true, forgot_password_token: true, email: true })
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const navigate = useNavigate()
    const [ResetPassword, { isLoading }] = useResetPasswordMutation()

    const { handleSubmit, formState: { errors }, control, watch, setError, register } = useForm<Omit<AuthSchemaType, 'name' | 'email' | 'forgot_password_token'>>({
        defaultValues: {
            password: '',
            confirm_password: ''
        },
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            await ResetPassword({ ...data, user_id: user_id as string }).unwrap()
            navigate(PAGE.LOGIN)
        } catch (error) {
            const e = error as ErrorHandle
            for (const key in e.data.error) {
                setError(key as ErrorKey, { message: e.data.error[key] })
            }
        }
    })

    useEffect(() => {
        watch((value) => {
            value.password && value.password.length > 0 && value.confirm_password && value.confirm_password.length > 0 ?
                setIsDisable(true) : setIsDisable(false)
        })
    }, [watch])


    return (
        <div className='flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat'
            style={{
                backgroundImage: `url(${Images.background})`,
            }}>

            <div>
                <form className="px-[30px]  w-[400px] min-h-[300px] rounded-[20px] bg-white blur-[100px] flex flex-col justify-center "
                    style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.15)' }}
                    onSubmit={onSubmit}
                >
                    <h2 className='w-full flex items-center justify-center font-fontFamily font-[700] mt-[30px] mb-[40px]'>Đặt lại mật khẩu</h2>
                    <div className="mb-[20px] mt-[20px] h-[10px] w-full flex-col  flex  justify-center  ">
                        <Label className=''>Mật khẩu mới</Label>
                        <ControllerInput
                            {...register('password')}
                            name="password"
                            control={control as unknown as Control<FieldValues>}
                            className=" flex flex-col justify-center !border-green1 !border-[2px]"
                            placeholder='Mật khẩu mới'
                            maxLength={50}
                        />
                        {errors.password?.message && <span className="text-error font-fontFamily text-[14px] mt-[3px]">{t(errors.password.message)}</span>}
                    </div>
                    <div className="mb-[20px] mt-[60px] h-[10px] w-full flex-col  flex  justify-center  ">
                        <Label className=''>Xác nhận mật khẩu</Label>
                        <ControllerInput
                            {...register('confirm_password')}
                            name="confirm_password"
                            control={control as unknown as Control<FieldValues>}
                            className=" flex flex-col justify-center !border-green1 !border-[2px]"
                            placeholder='Xác nhận mật khẩu'
                            maxLength={50}
                        />
                        {errors.password?.message && <span className="text-error font-fontFamily text-[14px] mt-[3px]">{t(errors.password.message)}</span>}
                    </div>
                    <Button size='lg' className={`text-[17.5px] font-fontFamily cursor-pointer text-white font-[500] uppercase items-center justify-center bg-green1 rounded-[6px] min-w-[350px] border-none flex m-auto mt-[30px] ${isDisable ? ' cursor-pointer' : '!cursor-not-allowed  opacity-[0.3]'}`} disabled={!isDisable}>
                        {isLoading ? <Loading /> : t("register.verify")}
                    </Button>
                    <div className='flex justify-between mt-[10px]'>
                        <button type="button" className=" w-full flex items-center justify-center mb-[30px] border-none uppercase bg-transparent text-[14px]  text-green1 font-[500] cursor-pointer font-fontFamily mt-[20px]" onClick={() => navigate(PAGE.LOGIN)}>Quay lại đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
