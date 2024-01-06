import { useImperativeHandle, forwardRef, useState } from 'react'
import { useForm, Control, type FieldValues } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../Button";
import { Dialog, DialogOverlay } from "../Dialog";
import { Icons } from '../../../helps/icons';
import ControllerInput from '../../controller-form/controller-input';
import { CountChar } from '../../../helps/counterChar';
import UpdateMeSchema, { UpdateMeSchemaType } from '../../schema/updateMe';

const MAX_CHAR = 255

export type ShowPopupHandle = {
    showPopup: () => void;
};

interface PopupUpdateMeProps {
    children?: React.ReactNode
}

export const PopupUpdateMe = forwardRef<ShowPopupHandle, PopupUpdateMeProps>((prop, ref) => {
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false)
    const [countCharName, setCountCharName] = useState<number>(0)
    const [countCharLocation, setCountCharLocation] = useState<number>(0)
    const [countCharWebsite, setCountCharWebsite] = useState<number>(0)
    const [countCharBio, setCountCharBio] = useState<number>(0)
    const { register, handleSubmit, control, formState: { errors } } = useForm<UpdateMeSchemaType>({
        defaultValues: {
            username: '',
            // avatar: '',
            // photo_avatar: '',
            website: '',
            bio: '',
            location: ''
        },
        resolver: zodResolver(UpdateMeSchema),
    })
    const showPopup = () => {
        setIsShowPopup(true)
    }

    const hiddenPopup = () => {
        setIsShowPopup(false)
    }
    useImperativeHandle(ref, () => ({
        showPopup: showPopup
    }));

    const onSubmit = (handleSubmit(data=>{
        console.log(data)
    }))

    return (<div>
        {
            isShowPopup && <Dialog open={isShowPopup}>
                <DialogOverlay />
                <div className=' w-full h-full z-[999]  flex fixed inset-0 items-center justify-center'>
                    <form className='h-[650px]   w-[600px] bg-white rounded-[20px]  flex flex-col items-center relative' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} onSubmit={onSubmit} >
                        <div className='w-full px-[10px] flex  rounded-t-[20px] items-center cursor-pointer justify-between !h-[50px] '>
                            <div className='flex items-center'>
                                <div className='mr-[15px]' onClick={hiddenPopup}><Icons.IoMdClose size={20} /></div>
                                <h2 className='text-[20px] font-fontFamily'>Edit Profile</h2>
                            </div>
                            <Button className='bg-black text-white font-fontFamily !font-[700] text[15px] !rounded-[50px] cursor-pointer hover:opacity-[80%]'>Save</Button>
                        </div>
                        <div className='w-full flex-1 overflow-y-auto  scroll-smooth'>
                            <div className='w-[99%] relative  m-auto '>
                                <div className='h-[190px] bg-[#B2B2B2]  z-10 flex items-center justify-center w-[100%]'>
                                    <div className='w-[70px] h-[70px] text-white rounded-[50%]  bg-[rgba(0,0,0,0.6)] items-center flex justify-center cursor-pointer hover:opacity-[80%]'>
                                        <Icons.IoMdCamera size={25} />
                                    </div>
                                </div>
                                <div className='w-[100px] h-[100px] rounded-[50%] border-solid border-[2px] border-white bg-[red] absolute bottom-[-60px]  flex items-center justify-center left-[10px]'>
                                    <div className='w-[40px] h-[40px] text-white rounded-[50%]  bg-[rgba(0,0,0,0.6)] items-center flex justify-center cursor-pointer hover:opacity-[80%]'>
                                        <Icons.IoMdCamera size={15} />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-[20px] mt-[80px] w-[90%] h-[100px]  flex-col  flex  justify-center  m-auto  ">
                                <ControllerInput
                                    {...register('username', {
                                        onChange: (e) => setCountCharName(e.target.value.length)
                                    })
                                    }
                                    name="username"
                                    label='Họ và tên'
                                    required
                                    control={control as unknown as Control<FieldValues>}
                                    className=" flex flex-col justify-center !border-green1 !border-[2px] !h-[50px]"
                                    placeholder='Họ và tên'
                                    maxLength={255}
                                />
                                <CountChar error={errors?.username?.message as string} maxChar={MAX_CHAR} countChar={countCharName} />
                            </div>
                            <div className="mb-[20px]   w-[90%]  flex-col  flex  justify-center  m-auto  ">
                                <textarea
                                    {...register('bio', {
                                        onChange: (e) => setCountCharBio(e.target.value.length)
                                    })
                                    }
                                    name="bio"
                                    className=" flex flex-col rounded-[10px] justify-center px-[10px] py-[10px] !border-green1 !h-[100px] !border-[2px] resize-none"
                                    placeholder='Bio'
                                    maxLength={255}
                                />
                                <CountChar error={errors?.bio?.message as string} maxChar={MAX_CHAR} countChar={countCharBio} />
                            </div>
                            <div className="mb-[20px] w-[90%]  flex-col  flex  justify-center m-auto  ">
                                <ControllerInput
                                    {...register('location', {
                                        onChange: (e) => setCountCharLocation(e.target.value.length)
                                    })
                                    }
                                    name="location"
                                    required
                                    label='location'
                                    control={control as unknown as Control<FieldValues>}
                                    className="flex flex-col justify-center !border-green1 !border-[2px] !h-[50px]"
                                    placeholder='location'
                                    maxLength={255}
                                />
                                <CountChar error={errors?.location?.message as string} maxChar={MAX_CHAR} countChar={countCharLocation} />
                            </div>
                            <div className="mb-[20px]  w-[90%]  flex-col  flex  justify-center  m-auto  ">
                                <ControllerInput
                                     {...register('website', { onChange: (e) => setCountCharWebsite(e.target.value.length) })}
                                    name="website"
                                    required
                                    label='website'
                                    control={control as unknown as Control<FieldValues>}
                                    className=" flex flex-col justify-center !border-green1 !border-[2px] !h-[50px]"
                                    placeholder='website'
                                    maxLength={255}
                                />
                                <CountChar error={errors?.website?.message as string} maxChar={MAX_CHAR} countChar={countCharWebsite} />
                            </div>
                        </div>
                    </form>
                </div>
            </Dialog>
        }
    </div>
    )
});


