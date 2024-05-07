/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type ReactNode, type SetStateAction, type Dispatch, useEffect } from 'react'
import { getAdminToLS, getProfileToLS } from '../helps'
import { useCreateLikeRepliesCommentMutation, useLikeCommentMutation } from '../apis/comment'
import { Socket } from 'socket.io-client'
import { useGetNotificationQuery } from '../apis/notification'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetMeQuery } from '../apis'


interface ContextProp {
    auth: string,
    setAuth: React.Dispatch<string>
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
    listNotification: any[]
    setListNotification: Dispatch<SetStateAction<any[]>>
    countNotification: number
    setCountNotification: Dispatch<SetStateAction<number>>
}

const init = {
    auth: getAdminToLS() ?? '',
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
    setListNotification: () => null,
    countNotification: 0,
    setCountNotification: () => null,


}

export const ContextAPI = createContext<ContextProp>(init)

export const ProviderContext = ({ children }: { children: ReactNode }) => {
    const profile = getProfileToLS() as { user_id: string }
    const [limit, setLimit] = useState<number>(10)
    const { data: getNotifications, isLoading } = useGetNotificationQuery(profile?.user_id ? {
        user_id: profile?.user_id as string,
        limit: limit,
        page: 1
    } : skipToken)

    const [listNotification, setListNotification] = useState<any[]>([])
    const [countNotification, setCountNotification] = useState<number>(0)
    const [likeComment] = useLikeCommentMutation()
    const [likeRepliesComment] = useCreateLikeRepliesCommentMutation()
    const [auth, setAuth] = useState<string>(getAdminToLS() ?? '')
    const [isHovered, setIsHovered] = useState<string>('')
    const [socket, setSocket] = useState<null | Socket>(null)

    useEffect(() => {
        if (getNotifications && getNotifications.data) {
            setListNotification(getNotifications.data);
        }
    }, [getNotifications]);

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
        socket?.on("notification_like", (data: any) => {
            setListNotification(prev => [data, ...prev]);
            setCountNotification(prev => prev + 1)
        })
    }, [socket])

    useEffect(() => {
        socket?.on('following_user', (data: any) => {
            setListNotification(prev => [data, ...prev])
            setCountNotification(prev => prev + 1)
        })
    }, [socket])

    useEffect(() => {
        socket?.on('notification_bookmark', (data: any) => {
            setListNotification(prev => [data, ...prev]);
            setCountNotification(prev => prev + 1)
        })
    }, [socket])

    useEffect(() => {
        socket?.on('notification_comment', (data: any) => {
            setListNotification(prev => ([data, ...prev]));
            setCountNotification(prev => prev + 1)
        })

    }, [socket])
    useEffect(() => {
        socket?.on('notification_reply_comment', (data: any) => {
            setListNotification(prev => ([data, ...prev]));
            setCountNotification(prev => prev + 1)
        })

    }, [socket])
    useEffect(() => {
        socket?.on('notification_message', (data: any) => {
            setListNotification(prev => ([data, ...prev]));
            setCountNotification(prev => prev + 1)
        })
    }, [socket])
    useEffect(() => {
        socket?.on('notification_mentions', (data: any) => {
            setListNotification(prev => ([data, ...prev]));
            setCountNotification(prev => prev + 1)
        })
    }, [socket])

    useEffect(() => {
        socket?.on('notification_share_post', (data: any) => {
            setListNotification(prev => ([data, ...prev]));
            setCountNotification(prev => prev + 1)
        })
    }, [socket])


    const reset = () => {
        setAuth('')
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

    return <ContextAPI.Provider value={{ countNotification, setCountNotification, setIsHovered, listNotification, setListNotification, socket, setSocket, auth, setAuth, reset, handleLike, isHovered, isShowInputRepliesComment, handleSelectIcon, setIsShowInputRepliesComment, handleSelectIconRepliesComment }}>{children}</ContextAPI.Provider>
}

