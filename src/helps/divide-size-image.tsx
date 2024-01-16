
import { type SetStateAction } from "react"

import { cn } from "./cn"
import { Icons } from "./icons"
/**

 * @param arrayImage  array image
 * @returns { JSX.Element } Return total number
 * 
 */

type ImageItem = File | string
interface DivideImageSizeProps {
    type?: string,
    arrayImage: ImageItem[],
    setFiles?: React.Dispatch<SetStateAction<File[] | null>>
}

interface RenderImageProps {
    Images: ImageItem[],
    start: number;
    end: number;
    type?: string
}

interface EditImage {
    type?: string,
    text?: string,
    setFiles: React.Dispatch<SetStateAction<File[] | null>>
}

const editImage = ({ type, text, setFiles }: EditImage) => {
    const handleCloseImage = () => {
        console.log(1)
        setFiles([])
    }
    return (
        <>
            {
                type === 'post' &&
                <>
                    <div className="absolute bottom-[10px] right-[10px] px-[10px] py-[5px] rounded-[50px] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center">{text}</div>
                    <div className="absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-[50%] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center" onClick={handleCloseImage}><Icons.IoMdClose /></div>
                </>
            }
        </>
    )
}

const renderImage = ({ Images, start, end, type }: RenderImageProps) => {
    let ImageCurrent: ImageItem[] = []
    if (Images.length >= 2) {
        ImageCurrent = Images.slice(start, end)
    }
    return <div className="w-full flex items-center">
        {
            <div className="w-full grid grid-cols-12 gap-1">
                {
                    ImageCurrent.map((image, index) => {
                        return <div key={index} className="w-full relative  col-span-6">
                            <img src={image as string} className={cn("w-full rounded-md  object-cover", {
                                "min-h-[500px]": Images.length === 2,
                                "min-h-[100px]": Images.length === 3,
                                "min-h-[200px]": Images.length === 4,
                            })} alt="image" />
                            {/* {editImage({ text: 'Edit', setFiles: setFiles as React.Dispatch<SetStateAction<File[] | null>>, type: 'post' })} */}
                        </div>
                    })
                }
            </div>
        }
    </div>
}

export const DivideImageSize = ({ arrayImage, type, setFiles }: DivideImageSizeProps) => {
    switch (arrayImage.length) {
        case 1:
            return <div className="w-full relative">
                <img src={arrayImage[0] as string} className="min-h-[500px] w-full object-cover rounded-[10px]" alt="image" />
                {editImage({ text: 'Edit', setFiles: setFiles as React.Dispatch<SetStateAction<File[] | null>>, type })}
            </div>
        // case 2:
        //     return renderImage({ Images: arrayImage, start: 0, end: 2, type })
        // case 3:
        //     return <div className='w-full '>
        //         <div className="w-full relative">
        //             <img src={arrayImage[0] as string} className="h-[250px] w-full object-cover rounded-lg" alt="image" />
        //             {editImage(type, 'Edit')}
        //         </div>
        //         <div className="min-h-[50px]">
        //             {
        //                 renderImage({ Images: arrayImage, start: 1, end: 3, type })
        //             }
        //         </div>
        //     </div>
        // case 4:
        //     return <div className="w-full">
        //         {
        //             renderImage({ Images: arrayImage, start: 0, end: 2, type })
        //         }
        //         <div className="mt-[5px]">
        //             {
        //                 renderImage({ Images: arrayImage, start: 2, end: 4, type })
        //             }
        //         </div>
        //     </div>
        default:
            break;
    }
}