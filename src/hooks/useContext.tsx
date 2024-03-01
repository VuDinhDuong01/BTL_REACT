/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type ReactNode, type SetStateAction,type  Dispatch } from 'react'
import { getAccessTokenToLS, getProfileToLS } from '../helps'
import { GetCommentResponse } from '../components/post'
import { useCreateLikeRepliesCommentMutation, useLikeCommentMutation } from '../apis/comment'


const initComment = {
    message: '',
    data: []

}

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
    listComment: GetCommentResponse,
    setListComment: Dispatch<SetStateAction<GetCommentResponse>>
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
    listComment: initComment,
    handleSelectIconRepliesComment: async (icon: string) => { },
    setListComment: () => null
}

export const ContextAPI = createContext<ContextProp>(init)

export const ProviderContext = ({ children }: { children: ReactNode }) => {

    const [likeComment] = useLikeCommentMutation()
    const [likeRepliesComment] = useCreateLikeRepliesCommentMutation()
    const [auth, setAuth] = useState<AuthType | null>(Object)
    const [isHovered, setIsHovered] = useState<string>('')
    const { user_id } = getProfileToLS()
    const handleLike = (_id_comment: string) => {
        setIsHovered(_id_comment)
    }
    const [isShowInputRepliesComment, setIsShowInputRepliesComment] = useState<string>('')
    const [listComment, setListComment] = useState<GetCommentResponse>(initComment)
    const handleSelectIcon = async (icon: string) => {
        try {
            await likeComment({ comment_id: isHovered as string, user_id, icon: icon }).unwrap()
            setIsHovered('')
        }
        catch (error: unknown) {
            console.log(error)
        }
    }
    const reset = () => {
        setAuth(null)
    }
    const handleSelectIconRepliesComment = async (icon: string) => {
        try {
            await likeRepliesComment({ user_id, icon, replies_comment_id: isHovered }).unwrap()
            setIsHovered('')
        }
        catch (error: unknown) {
            console.log(error)
        }
    }
    return <ContextAPI.Provider value={{ setListComment, auth, setAuth, reset, handleLike, isHovered, isShowInputRepliesComment, handleSelectIcon, setIsShowInputRepliesComment, listComment, handleSelectIconRepliesComment }}>{children}</ContextAPI.Provider>
}

