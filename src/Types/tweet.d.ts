

interface TweetProps {
  user_id: string,
  medias?: string[],
  content?: string,
  hashtags?: string[],
  mentions?: string[],
  audience?: number
}

export interface Tweet {
  _id?: ObjectId
  content?: string
  hashtags?: string[]
  user_id: string
  mentions?: string[]
  medias: string[]
  audience?: TweetAudience
  guest_views?: number
  user_views?: number
  updated_at?: Date
  created_at?: Date
  users: { username: string; avatar: string; name: string, bio: string }
  likes: Like[]
  like_count?: number
  bookmarks?: Like[],
  comment_count?: number,
  count_share_post: number,
  check_share: boolean,
  medias_share: string[],
  username_share: string ,
  content_share: string ,
  avatar_share: string 
}
export interface Like {
  _id: string
  user_id: string
  tweet_id: string
  created_at: string
  updated_at: string
}
