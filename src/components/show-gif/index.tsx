/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useEffect, useState, forwardRef, useImperativeHandle, type SetStateAction, useRef } from 'react'
import { Dialog, DialogOverlay } from '../ui/dialog'
import { Icons } from '../../helps/icons'
import { useClickOutSide } from '../../hooks/useClickOutSide'
import { DialogContent } from '@radix-ui/react-dialog'


interface GifType {
    url: string,
    id: string
}
interface Pops {
    limit: number,
    setGif: React.Dispatch<SetStateAction<string>>
}

export interface handleShowPopup {
    handleShowPopup: () => void
}

export const ShowGIF = forwardRef<handleShowPopup, Pops>(({ limit, setGif }, ref) => {
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false)
    const refGif = useRef<HTMLDivElement>(null)
    const [getListGif, setGetListGif] = useState<GifType[]>([])

    const handleShowPopup = () => {
        setIsShowPopup(true)
    }

    const handleClosePopup = () => {
        setIsShowPopup(false)
    }

    useImperativeHandle(ref, () => ({
        handleShowPopup: handleShowPopup
    }));

    useClickOutSide({
        onClickOutSide: () => setIsShowPopup(false),
        ref: refGif
    })

    useEffect(() => {
        axios.get('https://api.giphy.com/v1/gifs/trending', {
            params: {
                api_key: 'jNBhpq6FIjnn0SWxmb1OXGYGFms2Lc7j',
                limit: limit,
            },
        }).then(res => {
            const filterGif: GifType[] = res.data.data.map((item: any) => {
                return {
                    id: item.id,
                    url: item.images.original.url
                }
            })
            setGetListGif(filterGif)
        }).catch((error: unknown) => {
            console.log("api goi loi!", error)
        }).finally(() => {
            console.log("done!")
        })
    }, [limit])

    const handleChooseItemGif = (gif: string) => {
        setGif(gif)
        setIsShowPopup(false)
    }
    return <div>
        {
            isShowPopup && <Dialog open={isShowPopup}>
                <DialogOverlay className='fixed inset-0 z-10 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto max-h-screen grid place-items-center' />
                <DialogContent className='w-full h-full !z-[99] flex fixed top-[-100px] bottom-0 left-0 right-0 items-center justify-center' >
                    <div className='h-[600px] w-[600px]  !z-[9] bg-white rounded-[20px] flex flex-col items-center' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}>
                        <div className="w-full mt-[10px] ml-[10px] cursor-pointer" onClick={handleClosePopup}><Icons.IoMdClose size={25} /></div>
                        <div className='w-full h-[600px] grid grid-cols-12 gap-1 overflow-y-scroll max-h-screen' ref={refGif}>
                            {
                                getListGif && getListGif.map((gif, index) => {
                                    return <div key={index} className='w-full  col-span-4 '>
                                        <img src={gif.url} alt='gif' className='w-full h-[100px] object-cover cursor-pointer' onClick={() => handleChooseItemGif(gif.url)} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        }
    </div>
})