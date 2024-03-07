/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import { useImperativeHandle, forwardRef, useState, useRef, ChangeEvent } from 'react'
import { useForm, Control, type FieldValues } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next";

import { Button } from "../button";
import { Dialog, DialogOverlay } from "../dialog";
import { Icons } from '../../../helps/icons';
import ControllerInput from '../../controller-form/controller-input';
import { CountChar } from '../../../helps/counter-char';
import UpdateMeSchema, { UpdateMeSchemaType } from '../../schema/updateMe';
import { Label } from '@radix-ui/react-label';
import { ToastMessage } from '../../../helps/toast-message';
import { DEFAULT_IMAGE_AVATAR, DEFAULT_IMAGE_COVER_PHOTO } from '../../../helps/image-user-default';
import { GetUserResponse } from '../../../types/user';
import { UploadImageResponse, useUpdateMeMutation, useUploadImageMutation } from '../../../apis';
import { Loading } from '../../../assets/icons/eye';
import { useClickOutSide } from '../../../hooks/useClickOutSide';
import { DialogContent } from '@radix-ui/react-dialog';

const MAX_CHAR = 255
const MAX_SIZE_FILE = 300 * 1024
const TYPE_FILE = ['image/png', 'image/jpg', 'image/svg']

export type ShowPopupHandle = {
    showPopup: () => void;
};

interface PopupUpdateMeProps {
    children?: React.ReactNode,
    dataMe: GetUserResponse
}
interface FileImageProps {
    [key: string]: File | null
}

export const PopupUpdateMe = forwardRef<ShowPopupHandle, PopupUpdateMeProps>(({ dataMe }, ref) => {
    const { t } = useTranslation()
    const [updateMe, { isLoading }] = useUpdateMeMutation()
    const [uploadImage] = useUploadImageMutation()
    const updateMeRef = useRef<HTMLDivElement>(null)
    const inputRefCoverPhoto = useRef<HTMLInputElement>(null)
    const inputRefAvatar = useRef<HTMLInputElement>(null)

    const [isShowPopup, setIsShowPopup] = useState<boolean>(false)
    const [countCharName, setCountCharName] = useState<number>(0)
    const [countCharLocation, setCountCharLocation] = useState<number>(0)
    const [countCharWebsite, setCountCharWebsite] = useState<number>(0)
    const [countCharBio, setCountCharBio] = useState<number>(0)
    const [fileImage, setFileImage] = useState<FileImageProps>({
        cover_photo: null,
        avatar: null
    })

    const { register, handleSubmit, control, formState: { errors }, getValues } = useForm<UpdateMeSchemaType>({
        defaultValues: {
            username: dataMe && dataMe?.data[0].username,
            website: dataMe && dataMe?.data[0].website,
            bio: dataMe && dataMe?.data[0].bio,
            location: dataMe && dataMe.data[0].location,
            name: dataMe && dataMe?.data[0].name,
            cover_photo: dataMe && dataMe.data[0].cover_photo,
            avatar: dataMe && dataMe.data[0].avatar
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
    }))

    useClickOutSide({
        onClickOutSide: () => setIsShowPopup(false),
        ref: updateMeRef
    })
    const onSubmit = (handleSubmit(async () => {
        try {
            const { username, name, bio, website, location } = getValues();
            let typeCheckImage: string = ''
            const formData = new FormData();
            if (fileImage.avatar) {
                formData.append('image', fileImage.avatar)
                typeCheckImage = 'avatar'
            }
            if (fileImage.cover_photo) {
                formData.append('image', fileImage.cover_photo)
                typeCheckImage = 'cover_photo'
            }
            let res: UploadImageResponse[] = [];
            if (fileImage.avatar !== null || fileImage.cover_photo !== null) {
                res = await uploadImage(formData).unwrap()
            }

            const bodyRequest = {
                ...(username !== dataMe?.data[0].username && { username: username }),
                ...(name !== dataMe?.data[0].name && { name: name }),
                ...(bio !== dataMe?.data[0].bio && { bio: bio }),
                ...(website !== dataMe?.data[0].website && { website: website }),
                ...(location !== dataMe?.data[0].location && { location: location }),
                ...(fileImage.cover_photo !== null && res.length === 2 && { cover_photo: res?.[1].image }),
                ...(fileImage.cover_photo !== null && res.length === 1 && { cover_photo: res?.[0].image }),
                ...(fileImage.avatar !== null && { avatar: res?.[0].image })
            }

            await updateMe(bodyRequest).unwrap();
            ToastMessage({ status: 'success', message: t('updateMe.updateMeSuccess') })
            setIsShowPopup(false)
            setFileImage({
                cover_photo: null,
                avatar: null
            })
        } catch (error: unknown) {
            console.log(error)
        }
    }))
    const handleShowFolderImageCoverPhoto = (type: 'cover_photo' | 'avatar') => () => {
        if (type === 'cover_photo') {
            if (inputRefCoverPhoto.current) {
                inputRefCoverPhoto.current.click();
            }
        } else {
            if (inputRefAvatar.current) {
                inputRefAvatar.current.click();
            }
        }
    }
    const handleImage = (type: 'avatar' | 'cover_photo') => (e: ChangeEvent<HTMLInputElement>) => {
        const nameFile = e.target.files?.[0]
        if (nameFile) {
            if (!TYPE_FILE.includes(nameFile.type)) {
                ToastMessage({ message: t("updateMe.worngFormatFile"), status: 'error' })
            } else if (nameFile.size > MAX_SIZE_FILE) {
                ToastMessage({ message: t("updateMe.wrongMaxSizeFile"), status: 'error' })
            }
            else {
                if (type === 'cover_photo') {
                    setFileImage(prev => ({ ...prev, cover_photo: nameFile }))
                } else {
                    setFileImage(prev => ({ ...prev, avatar: nameFile }))
                }
            }
        } else {
            ToastMessage({ message: t("updateMe.errorUploadFile"), status: 'error' })
        }
    }
    const renderUiImage = () => {
        return (
            <>
                {
                    <div className='w-[600px] relative '>
                        <img className='w-full h-[190px]' src={Boolean(fileImage.cover_photo) ? URL.createObjectURL(fileImage.cover_photo as File) : Boolean(dataMe?.data[0].cover_photo) ? dataMe?.data[0].cover_photo : DEFAULT_IMAGE_COVER_PHOTO} />
                        <div className='w-full  items-center flex justify-center absolute inset-0'>
                            <div className='w-[50px] h-[50px] mr-[20px] text-white rounded-[50%] bg-[rgba(0,0,0,0.6)] items-center flex justify-center cursor-pointer hover:opacity-[80%]' onClick={handleShowFolderImageCoverPhoto('cover_photo')}>
                                <input type='file' style={{ display: 'none' }} ref={inputRefCoverPhoto} onChange={handleImage('cover_photo')} />
                                <Icons.IoMdCamera size={20} />
                            </div>
                            <div>{Boolean(fileImage.cover_photo) && <div onClick={() => setFileImage(prev => ({ ...prev, cover_photo: null }))} className='w-[50px] h-[50px] text-white rounded-[50%]  bg-[rgba(0,0,0,0.6)] items-center flex justify-center cursor-pointer hover:opacity-[80%]'><Icons.IoMdClose size={20} /></div>}</div>
                        </div>
                    </div>
                }
            </>
        )
    }

    return (<div>
        {
            isShowPopup && <Dialog open={isShowPopup}>
                <DialogOverlay className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto py-16 grid place-items-center' />
                <DialogContent className=' w-full h-full flex fixed inset-0 items-center justify-center z-[999999]' >
                    <form className='h-[650px] w-[600px] bg-white rounded-[20px] flex flex-col items-center relative' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} onSubmit={onSubmit}>
                        <div className='w-full px-[10px] flex  rounded-t-[20px] items-center cursor-pointer justify-between !h-[50px] '>
                            <div className='flex items-center'>
                                <div className='mr-[15px] w-[30px] h-[30px] rounded-[50%] bg-black3 flex items-center justify-center hover:opacity-[80%]' onClick={hiddenPopup}><Icons.IoMdClose size={20} /></div>
                                <h2 className='text-[20px] font-fontFamily'>Edit Profile</h2>
                            </div>
                            <Button className='bg-black text-white font-fontFamily !font-[700] text[15px] !rounded-[50px] cursor-pointer hover:opacity-[80%]'>{isLoading ? <Loading /> : 'Save'}</Button>
                        </div>
                        <div className='w-full   flex-1 max-h-[650px] overflow-y-scroll overflow-hidden' ref={updateMeRef}>
                            <div className='w-full  '>
                                <div className='w-[99%] relative m-auto '>
                                    {
                                        renderUiImage()
                                    }
                                    <div className='w-[100px] h-[100px] relative'>
                                        <img
                                            src={Boolean(fileImage.avatar) ? URL.createObjectURL(fileImage.avatar as File) : Boolean(dataMe?.data[0].avatar) ? dataMe?.data[0].avatar : DEFAULT_IMAGE_AVATAR}
                                            className='w-full h-full mt-[-50px] ml-[20px] rounded-[50%] border-solid border-[2px] border-white'
                                        />
                                        <div className='absolute top-1/2 left-1/2' style={{ margin: '-67px 10px 0 0px' }} >
                                            <div className='w-[40px] h-[40px] text-white rounded-[50%] bg-[rgba(0,0,0,0.6)] items-center flex justify-center cursor-pointer hover:opacity-[80%]' onClick={handleShowFolderImageCoverPhoto('avatar')}>
                                                <input type='file' style={{ display: 'none' }} ref={inputRefAvatar} onChange={handleImage('avatar')} />
                                                <Icons.IoMdCamera size={15} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-[20px] mt-[-40px]  w-[90%] h-[100px]  flex-col  flex  justify-center  m-auto  ">
                                    <ControllerInput
                                        {...register('name', {
                                            onChange: (e) => setCountCharName(e.target.value.length)
                                        })
                                        }
                                        name="name"
                                        label={t('updateMe.name')}
                                        required
                                        control={control as unknown as Control<FieldValues>}
                                        className=" flex flex-col justify-center !h-[50px]"
                                        placeholder={t('updateMe.name')}
                                        maxLength={255}
                                    />
                                    <CountChar error={t(errors?.name?.message as string)} maxChar={MAX_CHAR} countChar={countCharName} />
                                </div>
                                <div className="mb-[20px]   w-[90%]  flex-col  flex  justify-center  m-auto  ">
                                    <Label className='text-[15px] font-fontFamily'>Bio</Label>
                                    <textarea
                                        {...register('bio', {
                                            onChange: (e) => setCountCharBio(e.target.value.length)
                                        })
                                        }
                                        name="bio"
                                        className=" flex flex-col rounded-[10px] justify-center px-[10px] py-[10px] !h-[100px]  resize-none"
                                        placeholder='Bio'
                                        maxLength={255}
                                    />
                                    <CountChar error={t(errors?.bio?.message as string)} maxChar={MAX_CHAR} countChar={countCharBio} />
                                </div>
                                <div className="mb-[20px] w-[90%]  flex-col  flex  justify-center m-auto  ">
                                    <ControllerInput
                                        {...register('location', {
                                            onChange: (e) => setCountCharLocation(e.target.value.length)
                                        })
                                        }
                                        name="location"
                                        required
                                        label='Location'
                                        control={control as unknown as Control<FieldValues>}
                                        className="flex flex-col justify-center  !h-[50px]"
                                        placeholder='location'
                                        maxLength={255}
                                    />
                                    <CountChar error={t(errors?.location?.message as string)} maxChar={MAX_CHAR} countChar={countCharLocation} />
                                </div>
                                <div className="mb-[20px]  w-[90%]  flex-col  flex  justify-center  m-auto  ">
                                    <ControllerInput
                                        {...register('website', { onChange: (e) => setCountCharWebsite(e.target.value.length) })}
                                        name="website"
                                        required
                                        label='website'
                                        control={control as unknown as Control<FieldValues>}
                                        className=" flex flex-col justify-center  !h-[50px]"
                                        placeholder='website'
                                        maxLength={255}
                                    />
                                    <CountChar error={t(errors?.website?.message as string)} maxChar={MAX_CHAR} countChar={countCharWebsite} />
                                </div>
                                <div className="mb-[20px]  w-[90%]  flex-col  flex  justify-center  m-auto  ">
                                    <ControllerInput
                                        {...register('username', { onChange: (e) => setCountCharWebsite(e.target.value.length) })}
                                        name="username"
                                        control={control as unknown as Control<FieldValues>}
                                        className=" flex flex-col justify-center  !h-[50px]"
                                        label={t('updateMe.username')}
                                        maxLength={255}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        }
    </div>
    )
});


