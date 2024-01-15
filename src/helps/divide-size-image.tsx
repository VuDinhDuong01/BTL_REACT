
import { cn } from "./cn"
import { Icons } from "./icons"
/**

 * @param arrayImage  array image
 * @returns { JSX.Element } Return total number
 */

type ImageItem = File | string


const editImage = (type?: string, text?: string) => {
    return (
        <>
            {
                type === 'post' ? <div className="absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-[50%] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center">{text}</div>
                    : <div className="absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-[50%] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center"><Icons.IoMdClose /></div>
            }
        </>
    )
}
const renderImage = (Images: ImageItem[], start: number, end: number, type?: string) => {
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
                                "min-h-[200px]": Images.length === 4
                            })} alt="image" />
                            {editImage(type, '')}
                            {editImage(type, 'Edit')}
                        </div>
                    })
                }
            </div>
        }
    </div>
}

export const DivideImageSize = (arrayImage: ImageItem[], type?: string) => {
    switch (arrayImage.length) {
        case 1:
            <div className="w-full relative">
                <img src={arrayImage[0] as string} className="min-h-[500px] w-full object-cover rounded-[10px]" alt="image" />
                {editImage(type)}
                {editImage(type, 'Edit')}
            </div>
            break;
        case 2:
            renderImage(arrayImage, 0, 2, type)
            break;

        case 3:
            <div className='w-full '>
                <div className="w-full relative">
                    <img src={arrayImage[0] as string} className="h-[250px] w-full object-cover rounded-lg" alt="image" />
                    {editImage(type, '')}
                    {editImage(type, 'Edit')}
                </div>
                <div className="min-h-[50px]">
                    {
                        renderImage(arrayImage, 1, 3, type)
                    }
                </div>
            </div>
            break;

        case 4:
            <div className="w-full">
                {
                    renderImage(arrayImage, 0, 2, type)
                }
                <div className="mt-[5px]">
                    {
                        renderImage(arrayImage, 2, 4, type)
                    }
                </div>
            </div>
            break;

        default:
            break;

    }
}