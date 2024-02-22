
interface User{
    avatar: string 
    username:string 
}

interface LikeComment{
    _id:string ,
    comment_id:string 
    user_id:string 
    created_at:string 
    updated_at:string 
}
interface RepliesComment{
    _id:string 
    user_id:string 
    replies_content_comment:string 
    replies_image_comment:string[]
    replies_like_comments:[]
    avatar:string 
    username:string 
}
export interface Comment{
    _id:string 
    user_id:string
    tweet_id:string
    content_comment:string 
    image_comment:string 
    created_at:string 
    updated_at:string 
    info_user:User,
    like_comments:LikeComment[]
    replies_comments:RepliesComment[]
}