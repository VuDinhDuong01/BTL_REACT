type ImageItem = File | string

interface DivideImageSizeProps {
    arrayImage: ImageItem[],
    setFiles?: React.Dispatch<SetStateAction<File[] | null>>
}

interface RenderImageProps extends DivideImageSizeProps {
    start: number;
    end: number;
}