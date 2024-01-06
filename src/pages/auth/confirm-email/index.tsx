import { useNavigate, generatePath } from 'react-router-dom';
import { useForm, Control, type FieldValues } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

import { Button } from "../../../components/ui/Button"
import AuthSchema, { type AuthSchemaType } from "../../../components/schema/login"
import { Images } from "../../../assets/images"
import ControllerInput from "../../../components/controller-form/controller-input"
import { useConfirmEmailMutation } from '../../../apis';
import { ErrorHandle } from '../../../Types/LoginType';
import { Loading } from '../../../assets/icons/eye';
import { PAGE } from '../../../contants';


export const ConfirmPassword = () => {
    const { t } = useTranslation();
    const loginSchema = AuthSchema.omit({ name: true, password: true, forgot_password_token: true, confirm_password: true })
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const navigate = useNavigate()
    const [ConfirmPassword, { isLoading }] = useConfirmEmailMutation()
    const { handleSubmit, formState: { errors }, control, watch, setError } = useForm<Omit<AuthSchemaType, 'name' | 'password' | 'forgot_password_token' | 'confirm_password'>>({
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await ConfirmPassword(data).unwrap()
            navigate(generatePath(PAGE.CONFIRM_CODE, { user_id: res.data._id as unknown as string }))
        } catch (error) {
            const e = error as ErrorHandle
            for (const key in e.data.error) {
                setError(key as 'email', { message: e.data.error[key] })
            }
        }
    })

    useEffect(() => {
        watch((value) => {
            value.email && value.email.length > 0 ?
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
                    <h2 className='w-full flex items-center justify-center font-fontFamily font-[700] mt-[30px] mb-[20px]'>Đặt lại mật khẩu</h2>
                    <p className='text-[16px]  text-[#0F172A] text-center font-fontFamily mb-[20px] font-bold'>Vui lòng kiểm tra Email và ấn tiếp tục để nhận mã xác nhận</p>
                    <div className="mb-[20px] mt-[20px] h-[10px] w-full flex-col  flex  justify-center  ">
                        <ControllerInput
                            name="email"
                            control={control as unknown as Control<FieldValues>}
                            className=" flex flex-col justify-center !border-green1 !border-[2px]"
                            placeholder={t("login.enterEmail")}
                        />
                        {errors.email?.message && <span className="text-error font-fontFamily text-[14px] mt-[3px]">{t(errors.email.message)}</span>}
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
