/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useImperativeHandle, forwardRef, type KeyboardEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Dialog, DialogOverlay, DialogHeader, DialogFooter } from '../dialog/index'
import { Button } from '../button'
import { Input } from '../Input'
import { HandleDiaLog } from '../../../types/login'
import { regex } from '../../../helps'
import { useVerifyEmailMutation } from '../../../apis'
import { Loading } from '../../../assets/icons/eye'
import { PAGE } from '../../../contants'
import { Delete } from 'lucide-react'
interface FormDiaLogProp {
    placeholder?: string,
    title1?: string,
    title2?: string
    titleButton?: string

}

export const FormDiaLog = forwardRef<HandleDiaLog, FormDiaLogProp>(({ placeholder, title1, title2, titleButton }, ref) => {

    const [openDiaLog, setOpenDiaLog] = useState<boolean>(false)
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const navigate = useNavigate()
    const handleOpenDiaLog = () => {
        setOpenDiaLog(true)
    }

    useImperativeHandle(ref, () => ({
        openDiaLog: handleOpenDiaLog
    }));

    const { register, handleSubmit, formState: { errors }, setError, watch } = useForm({
        defaultValues: {
            code: ''
        }
    })

    const [verifyEmail, { isLoading: loadingVerifyEmail }] = useVerifyEmailMutation()
    const handleSendCode = handleSubmit(async (data) => {
        try {
            await verifyEmail(data).unwrap()
            navigate(PAGE.LOGIN)
        } catch (error: any) {
            setError('code', { message: error.data.error.email_verify_token })
        }
    })

    const handleBlockSpace = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === '' || !regex.checkNumber.test(e.key)) {
            e.preventDefault()
        }
    }

    const handleDeleteDialog = () => {
        setOpenDiaLog(false)
    }

    useEffect(() => {
        watch((value) => {
            value.code && value.code.length > 0 ? setDisableButton(true) : setDisableButton(false)
        })
    }, [watch])


    return openDiaLog && <Dialog open={openDiaLog}>
        <DialogOverlay />
        <div className='z-[999] w-full h-full flex fixed inset-0 items-center m-auto justify-center'>
            <form className='w-[390px] bg-white rounded-[6px] flex flex-col items-center justify-center h-[250px] relative' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} onSubmit={handleSendCode}>
                <Delete className='cursor-pointer absolute top-[5px] right-[5px]' onClick={handleDeleteDialog} />
                <DialogHeader className='w-full flex items-center justify-center mb-[20px]'>
                    <span className='text-[16px] text-[#0F172A] font-fontFamily font-bold'>{title1}</span>
                    <p className='text-[16px]  text-[#0F172A] font-fontFamily mb-[20px] font-bold'>{title2}</p>
                </DialogHeader>
                <div className='h-[70px]' >
                    <Input
                        id="code"
                        placeholder={placeholder}
                        maxLength={6}
                        className=" w-[300px]"
                        {...register("code")}
                        onKeyPress={(e) => handleBlockSpace(e)}
                    />
                    {errors.code && <p className='text-error text-[14px] font-fontFamily mt-[5px]'>{errors.code.message}</p>}
                </div>
                <DialogFooter>
                    {
                        <Button className={`font-fontFamily text-[17px] uppercase  font-[700]  text-white w-[300px] h-[45px] bg-green1 ${disableButton ? 'cursor-pointer' : '!cursor-not-allowed  opacity-[0.3]'}`} disabled={!disableButton}>{loadingVerifyEmail ? <Loading /> : titleButton}</Button>
                    }
                </DialogFooter>
            </form>
        </div>
    </Dialog>
});

