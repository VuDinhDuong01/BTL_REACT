import { useNavigate, generatePath, useParams, Link } from 'react-router-dom';
import { useForm, Control, type FieldValues } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';

import { Button } from "../../../components/ui/Button"
import AuthSchema, { type AuthSchemaType } from "../../../components/schema/login"
import { Images } from "../../../assets/images"
import ControllerInput from "../../../components/controller-form/controller-input"
import { useConfirmCodeMutation } from '../../../apis';
import { ErrorHandle } from '../../../Types/LoginType';
import { Loading } from '../../../assets/icons/eye';
import { PAGE } from '../../../contants';

export const ConfirmCode = () => {
    const params = useParams()
    const { user_id } = params
    console.log(user_id)
    const { t } = useTranslation();
    const loginSchema = AuthSchema.omit({ name: true, password: true, email: true, confirm_password: true })
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const navigate = useNavigate()
    const [ConfirmCode, { isLoading }] = useConfirmCodeMutation()

    const { handleSubmit, formState: { errors }, control, watch, setError } = useForm<Omit<AuthSchemaType, 'name' | 'email' | 'password' | 'confirm_password'>>({
        defaultValues: {
            forgot_password_token: ''
        },
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await ConfirmCode({ ...data, user_id: user_id as string }).unwrap()
            navigate(generatePath(PAGE.RESET_PASSWORD, { user_id: res.data._id as unknown as string }))
        } catch (error) {
            const e = error as ErrorHandle
            for (const key in e.data.error) {
                setError(key as 'forgot_password_token', { message: e.data.error[key] })
            }
        }
    })

    useEffect(() => {
        watch((value) => {
            value.forgot_password_token && value.forgot_password_token.length > 0 ?
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
                    <p className='text-[14px]  text-[#0F172A] text-center font-fontFamily  font-[600]'>Mã xác thực đã được gửi về Email của bạn.</p>
                    <p className='text-[14px] w-[250px]  flex items-center justify-center m-auto text-[#0F172A] text-center font-fontFamily mb-[20px] font-[600] leading-[20px]'> Vui lòng nhập chính xác mã vào ô bên dưới</p>
                    <div className="mb-[20px] mt-[20px] h-[10px] w-full flex-col  flex  justify-center  ">
                        <ControllerInput
                            name="forgot_password_token"
                            control={control as unknown as Control<FieldValues>}
                            className=" flex flex-col justify-center !border-green1 !border-[2px]"
                            placeholder='Mã xác thực'
                            maxLength={6}
                        />
                        {errors.forgot_password_token?.message && <span className="text-error font-fontFamily text-[14px] mt-[3px]">{t(errors.forgot_password_token.message)}</span>}
                    </div>
                    <Button size='lg' className={`text-[17.5px] font-fontFamily cursor-pointer text-white font-[500] uppercase items-center justify-center bg-green1 rounded-[6px] min-w-[350px] border-none flex m-auto mt-[30px] ${isDisable ? ' cursor-pointer' : '!cursor-not-allowed  opacity-[0.3]'}`} disabled={!isDisable}>
                        {isLoading ? <Loading /> : t("register.verify")}
                    </Button>
                    <div className='flex justify-between mt-[10px]'>
                        <Link to={PAGE.LOGIN} className=" w-full flex items-center justify-center mb-[30px] border-none uppercase bg-transparent text-[15px]  text-green1 font-[700] cursor-pointer font-fontFamily mt-[20px]" onClick={() => navigate(PAGE.LOGIN)}>Quay lại đăng nhập</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
