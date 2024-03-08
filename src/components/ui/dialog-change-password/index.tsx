/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, forwardRef, useImperativeHandle, useEffect } from "react"
import { useForm, Control, type FieldValues } from 'react-hook-form'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import omit from 'lodash/omit'

import { Dialog, DialogOverlay } from "../dialog"
import ControllerInput from "../../controller-form/controller-input"
import { CountChar } from "../../../helps/counter-char"
import { Icons } from "../../../helps/icons";
import { Button } from "../button";
import changePasswordSchema, { ChangePasswordSchemaType } from "../../schema/change-password";
import { Loading } from "../../../assets/icons/eye";
import { useChangePasswordMutation } from "../../../apis";
import { ErrorHandle } from "../../../types/login";
import { PAGE } from "../../../contants";
import { removeLS } from "../../../helps";
import { ToastMessage } from "../../../helps/toast-message";
import { DialogContent } from "@radix-ui/react-dialog";
export interface ChangePasswordResponse {
    showPopupChangePassword: () => void,
    hiddenPopupChangePassword: () => void
}

const MAX_CHAR = 25

export const ChangePassword = forwardRef<ChangePasswordResponse, any>(({ refFormChangePassword }, ref) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [isShowPopupChangePassword, setIsShowPopupChangePassword] = useState<boolean>(false)
    const [countPassword, setCountPassword] = useState(0)
    const [countNewPassword, setCountNewPassword] = useState(0)
    const [countConfirmPassword, setCountConfirmPassword] = useState(0)
    const [disableButton, setDisableButton] = useState(false)
    const [changePassword, { isLoading }] = useChangePasswordMutation()

    const { register, handleSubmit, control, formState: { errors }, watch, setError } = useForm<ChangePasswordSchemaType>({
        defaultValues: changePasswordSchema.getDefault(),
        resolver: yupResolver(changePasswordSchema),
    })

    const handleShowPopupChangePassword = () => {
        setIsShowPopupChangePassword(true)
    }
    useImperativeHandle(ref, () => ({
        showPopupChangePassword: handleShowPopupChangePassword,
        hiddenPopupChangePassword: hiddenPopup
    }));

    const onSubmit = (handleSubmit(async (data) => {
        try {
            const bodyRequest = omit(data, ['confirm_password']);
            await changePassword(bodyRequest).unwrap();
            navigate(PAGE.LOGIN)
            ToastMessage({ status: 'success', message: t('changePassword.changePasswordSuccess') })
            removeLS()
        } catch (error: unknown) {
            const e = error as ErrorHandle
            console.log(e)
            for (const key in e.data.error) {
                setError(key as 'password', { message: e.data.error[key] })
            }
        }
    }))

    const hiddenPopup = () => {
        setIsShowPopupChangePassword(false)
    }

    useEffect(() => {
        watch((value) => {
            value.confirm_password && value.confirm_password.length > 0
                && value.new_password && value.new_password.length > 0
                && value.password && value.password.length > 0 ? setDisableButton(true) : setDisableButton(false)
        })
    }, [watch])

    return <div className="w-full relative z-[9999]">
        {
            isShowPopupChangePassword && <Dialog open={isShowPopupChangePassword} >
                <DialogOverlay className='fixed inset-0 z-10 bg-black/50' />
                <DialogContent className='w-full h-full flex fixed inset-0 items-center justify-center z-[999]'>
                    <form className='min-h-[480px] min-w-[450px] ]  bg-white rounded-[20px] flex flex-col items-center ' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} onSubmit={onSubmit} ref={refFormChangePassword}>
                        <div className="w-full mt-[10px] ml-[10px] cursor-pointer" onClick={hiddenPopup}><Icons.IoMdClose size={25} /></div>
                        <h2 className='text-[25px] font-fontFamily'>{t('changePassword.change_password')}</h2>
                        <div className='w-full'>
                            <div className=" mt-[20px] w-[90%] h-[100px]  flex-col  flex  justify-center  m-auto  ">
                                <ControllerInput
                                    {...register('password', {
                                        onChange: (e) => setCountPassword(e.target.value.length)
                                    })
                                    }
                                    name="password"
                                    type="password"
                                    label={t('changePassword.oldPassword')}
                                    required
                                    control={control as unknown as Control<FieldValues>}
                                    className=" flex flex-col justify-center  !h-[45px]"
                                    placeholder={t('changePassword.password')}
                                    maxLength={MAX_CHAR}
                                />
                                <CountChar error={t(errors?.password?.message as string)} maxChar={MAX_CHAR} countChar={countPassword} />
                            </div>
                            <div className="h-[100px] w-[90%] flex-col flex justify-center  m-auto  ">
                                <ControllerInput
                                    {...register('new_password', {
                                        onChange: (e) => setCountNewPassword(e.target.value.length)
                                    })
                                    }
                                    type="password"
                                    name="new_password"
                                    required
                                    label={t('changePassword.newPassword')}
                                    control={control as unknown as Control<FieldValues>}
                                    className=" flex flex-col justify-center  !h-[45px]"
                                    placeholder={t('changePassword.newPassword')}
                                    maxLength={MAX_CHAR}
                                />
                                <CountChar error={t(errors?.new_password?.message as string)} maxChar={MAX_CHAR} countChar={countNewPassword} />
                            </div>
                            <div className="h-[100px] w-[90%]  flex-col  flex  justify-center m-auto">
                                <ControllerInput
                                    {...register('confirm_password', {
                                        onChange: (e) => setCountConfirmPassword(e.target.value.length)
                                    })
                                    }
                                    type="password"
                                    name="confirm_password"
                                    required
                                    label={t('changePassword.confirmPassword')}
                                    control={control as unknown as Control<FieldValues>}
                                    className="flex flex-col justify-center  !h-[45px]"
                                    placeholder={t('changePassword.password')}
                                    maxLength={MAX_CHAR}
                                />
                                <CountChar error={t(errors?.confirm_password?.message as string)} maxChar={MAX_CHAR} countChar={countConfirmPassword} />
                            </div>
                            <div className="w-full flex items-center justify-center "><Button className={`w-[90%] mt-[20px] cursor-pointer h-[45px] bg-green1 text-white uppercase ${disableButton ? ' cursor-pointer' : '!cursor-not-allowed  opacity-[0.3]'}`}> {isLoading ? <Loading /> : t('changePassword.confirm')}</Button></div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        }
    </div>

})