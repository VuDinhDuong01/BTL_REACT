/**
 * Create mulit signature wallet function
 * @param arrayImage  array image
 * @returns { JSX.Element } Return total number
 */

import { cn } from "./cn"

export interface ArrayImageType {
    image: string,
    type: string
}

const renderImage = (Images: ArrayImageType[], start: number, end: number) => {
    let ImageCurrent: ArrayImageType[] = []
    if (Images.length >= 2) {
        ImageCurrent = Images.slice(start, end)
    }
    return <div className="w-full flex items-center">
        {
            <div className="w-full grid grid-cols-12 gap-1">
                {
                    ImageCurrent.map((image, index) => {
                        return <img src={image.image} className={cn("w-full rounded-md col-span-6 object-cover", {
                            "min-h-[500px]": Images.length === 2,
                            "min-h-[100px]": Images.length === 3,
                            "min-h-[200px]": Images.length === 4
                        })} alt="image" key={index} />
                    })
                }
            </div>
        }
    </div>
}

export const DivideImageSize = (arrayImage: ArrayImageType[]) => {
    switch (arrayImage.length) {
        case 1:
            return <div className="w-full">
                <img src={arrayImage[0].image} className="min-h-[500px] w-full object-cover rounded-[10px]" alt="image" />
            </div>
        case 2:
            return renderImage(arrayImage, 0, 2)
            
        case 3:
            return <div className='w-full '>
                <div>
                    <img src={arrayImage[0].image} className="h-[250px] w-full object-cover rounded-lg" alt="image" />
                </div>
                <div className="min-h-[50px]">
                    {
                        renderImage(arrayImage, 1, 3)
                    }
                </div>
            </div>

        case 4:
            return <div className="w-full">
                {
                    renderImage(arrayImage, 0, 2)
                }
                <div className="mt-[5px]">
                    {
                        renderImage(arrayImage, 2, 4)
                    }
                </div>
            </div>

        default:
            break;

    }
}