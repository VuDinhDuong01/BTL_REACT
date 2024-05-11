type ImageItem = File | string

interface DivideImageSizeProps {
    arrayImage: ImageItem[],
    setFiles?: React.Dispatch<SetStateAction<File[] | null>>,
    heightOneImage?:string ,
    heightTwoImage?:string 
}

interface RenderImageProps extends DivideImageSizeProps {
    start: number;
    end: number;
}