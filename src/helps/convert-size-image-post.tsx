/* eslint-disable react-hooks/rules-of-hooks */
import { type SetStateAction } from "react"

import { cn } from "./cn"
import { Icons } from "./icons"



/**
 * @param arrayImage  array images
 * @returns { JSX.Element } Return Element
 * 
 */


interface DivideImageSizeProps {
    arrayImage: string[],
    setFiles: React.Dispatch<SetStateAction<string[]>>
}
interface RenderImageProps extends DivideImageSizeProps  {
    start: number;
    end: number;
    
}
interface EventImagePost extends Omit<DivideImageSizeProps, 'arrayImage'> {
    image: string,
    
}

const handleEventImagePost = ({ setFiles, image }: EventImagePost) => {
    const handleDeleteFile = () => {
        setFiles(prev => (prev?.filter(item => item !== image)))
    }
    return (
        <>
            <div className="absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-[50%] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center" onClick={handleDeleteFile}><Icons.IoMdClose /></div>
        </>
    )
}

const renderImage = ({ arrayImage, start, end, setFiles }: RenderImageProps) => {

    let ImageCurrent: string[] = []
    if (arrayImage.length >= 2) {
        ImageCurrent = arrayImage.slice(start, end)
    }

    return <div className="w-full flex items-center">
        {
            <div className="w-full grid grid-cols-12 gap-1">
                {
                    ImageCurrent.map((image, index) => {
                        return <div key={index} className="w-full relative  col-span-6">
                            <img src={image as string} className={cn("w-full rounded-md  object-cover", {
                                "h-[100px]": arrayImage.length === 2,
                                " h-[100px]": arrayImage.length === 3,
                                "   h-[120px]": arrayImage.length === 4,
                            })} alt="image" />

                            {handleEventImagePost({ setFiles, image })}

                        </div>
                    })
                }
            </div>
        }
    </div>
}

export const ConvertSizeImagesPost = ({ arrayImage, setFiles }: DivideImageSizeProps) => {
    switch (arrayImage.length) {
        case 1:
            return <div className="w-full relative">
                <img src={arrayImage[0] as string} className={cn("w-full object-cover rounded-[10px] h-[250px]")} alt="image" />

                {handleEventImagePost({ setFiles, image: arrayImage[0] })}

            </div>
        case 2:
            return renderImage({ arrayImage: arrayImage, start: 0, end: 2, setFiles: setFiles })
        case 3:
            return <div className='w-full '>
                <div className="w-full relative">
                    <img src={arrayImage[0] as string} className="h-[200px] w-full object-cover rounded-lg" alt="image" />

                    {handleEventImagePost({ setFiles, image: arrayImage[0] })}

                </div>
                <div className="min-h-[50px]">
                    {
                        renderImage({ arrayImage: arrayImage, start: 1, end: 3, setFiles: setFiles })
                    }
                </div>
            </div>
        case 4:
            return <div className="w-full">
                {
                    renderImage({ arrayImage: arrayImage, start: 0, end: 2, setFiles: setFiles  })
                }
                <div className="mt-[5px]">
                    {
                        renderImage({ arrayImage: arrayImage, start: 2, end: 4, setFiles: setFiles })
                    }
                </div>
            </div>
        default:
            break;
    }
}