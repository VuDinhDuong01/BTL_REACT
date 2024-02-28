import ReactPlayer from 'react-player'

interface VideoPlayerProps {
    url: string
    width?:number
}
export const VideoPlayer = ({ url , width}: VideoPlayerProps) => {
    return <ReactPlayer url={url}    width={500} controls={true} />
}