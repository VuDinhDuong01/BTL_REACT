

import { cn } from "./cn"

/**
 * @param arrayImage  array images
 * @returns { JSX.Element } Return Element
 * 
 */

const renderImage = ({ arrayImage, start, end, }: RenderImageProps) => {
    let ImageCurrent: ImageItem[] = []
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
                                "min-h-[500px]": arrayImage.length === 2,
                                "min-h-[100px]": arrayImage.length === 3,
                                "min-h-[200px]": arrayImage.length === 4,

                            })} alt="image" />
                        </div>
                    })
                }
            </div>
        }
    </div>
}

export const DivideImageSize = ({ arrayImage, setFiles }: DivideImageSizeProps) => {
    switch (arrayImage.length) {
        case 1:
            return <div className="w-full relative">
                <img src={arrayImage[0] as string} className={cn("w-full object-cover rounded-[10px] min-h-[500px]")} alt="image" />
            </div>
        case 2:
            return renderImage({ arrayImage: arrayImage, start: 0, end: 2, setFiles: setFiles })
        case 3:
            return <div className='w-full '>
                <div className="w-full relative">
                    <img src={arrayImage[0] as string} className="h-[200px] w-full object-cover rounded-lg" alt="image" />
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
                    renderImage({ arrayImage: arrayImage, start: 0, end: 2, setFiles: setFiles })
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