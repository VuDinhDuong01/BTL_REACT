/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type ReactNode, type SetStateAction, type Dispatch, useEffect } from 'react'
import { getAccessTokenToLS, getProfileToLS } from '../helps'
import { NotificationType } from '../components/post'
import { useCreateLikeRepliesCommentMutation, useLikeCommentMutation } from '../apis/comment'
import { Socket } from 'socket.io-client'

interface ContextProp {
    auth: AuthType | null,
    setAuth: React.Dispatch<SetStateAction<AuthType | null>>
    reset: () => void
    handleLike: (_id_comment: string) => void
    isHovered: string
    isShowInputRepliesComment: string
    handleSelectIcon: (icon: string) => Promise<void>
    handleSelectIconRepliesComment: (icon: string) => Promise<void>
    setIsShowInputRepliesComment: Dispatch<SetStateAction<string>>
    socket: null | Socket,
    setSocket: Dispatch<SetStateAction<Socket<any, any> | null>>
    setIsHovered: Dispatch<SetStateAction<string>>
    listNotification: NotificationType[]
    setListNotification: Dispatch<SetStateAction<NotificationType[]>>
}

interface AuthType {
    role?: string,
    auth: boolean
}

const init = {
    auth: { role: '', auth: Boolean(getAccessTokenToLS()) },
    setAuth: () => null,
    reset: () => null,
    handleLike: (_id_comment: string) => null,
    isHovered: '',
    isShowInputRepliesComment: '',
    handleSelectIcon: async (icon: string) => { },
    setIsShowInputRepliesComment: () => null,
    handleSelectIconRepliesComment: async (icon: string) => { },
   
    socket: null,
    setSocket: () => null,
    setIsHovered: () => null,
    listNotification: [],
    setListNotification: () => null
}

export const ContextAPI = createContext<ContextProp>(init)

export const ProviderContext = ({ children }: { children: ReactNode }) => {
    const [listNotification, setListNotification] = useState<NotificationType[]>([])
    const [likeComment] = useLikeCommentMutation()
    const [likeRepliesComment] = useCreateLikeRepliesCommentMutation()
    const [auth, setAuth] = useState<AuthType | null>(Object)
    const [isHovered, setIsHovered] = useState<string>('')
    const [socket, setSocket] = useState<null | Socket>(null)

    const profile = getProfileToLS() as { user_id: string }
    const handleLike = (_id_comment: string) => {
        setIsHovered(_id_comment)
    }
    const [isShowInputRepliesComment, setIsShowInputRepliesComment] = useState<string>('')
    const handleSelectIcon = async (icon: string) => {
        try {
            await likeComment({ comment_id: isHovered as string, user_id: profile?.user_id, icon: icon }).unwrap()
            setIsHovered('')
        }
        catch (error: unknown) {
            console.log(error)
        }
    }

    useEffect(() => {
        socket?.on("notification_like", (data: NotificationType) => {
            setListNotification(prev => {
                const existsNotification = prev.some(item => item.to === data.to && item.tweet_id === data.tweet_id);
                if (!existsNotification) {
                    return [data,...prev, data];
                }
                return prev;
            });
        })
    }, [socket])

    useEffect(() => {
        socket?.on('following_user', (data: NotificationType) => {
            setListNotification(prev => {
                const existFollow = prev.some(item => item.to === data.to && item.from === data.from && item.status === data.status)
                if (!existFollow) {
                    return ([data,...prev])
                }
                return prev
            })
        })
    }, [socket])

    useEffect(() => {
        socket?.on('notification_bookmark', (data: NotificationType) => {
            setListNotification(prev => {
                const existsNotification = prev.some(item => item.to === data.to && item.tweet_id === data.tweet_id && item.status === data.status);
                if (!existsNotification) {
                    return [data,...prev];
                }
                return prev;
            });
        })
    })

    useEffect(() => {
        socket?.on('notification_comment', (data: NotificationType) => {
            setListNotification(prev => ([data,...prev]));
        })
    }, [socket])

    const reset = () => {
        setAuth(null)
    }

    const handleSelectIconRepliesComment = async (icon: string) => {
        try {
            await likeRepliesComment({ user_id: profile?.user_id, icon, replies_comment_id: isHovered }).unwrap()
            setIsHovered('')
        }
        catch (error: unknown) {
            console.log(error)
        }
    }

    return <ContextAPI.Provider value={{ setIsHovered, listNotification, setListNotification, socket, setSocket, auth, setAuth, reset, handleLike, isHovered, isShowInputRepliesComment, handleSelectIcon, setIsShowInputRepliesComment, handleSelectIconRepliesComment }}>{children}</ContextAPI.Provider>
}

