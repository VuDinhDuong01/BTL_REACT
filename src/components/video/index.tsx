import ReactPlayer from 'react-player'

interface VideoPlayerProps {
    url: string
}
export const VideoPlayer = ({ url }: VideoPlayerProps) => {
    return <div className='w-[100px]  rounded-lg'><ReactPlayer url={url} style={{width:"100%"}} /></div>
}