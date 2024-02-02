

interface TweetProps {
    user_id: string,
    medias?: string[],
    content?: string,
    hashtags?: string[],
    mentions?: string[],
    audience?: number
}

interface Tweet {
    _id: string,
    [key in any]: string
    content: string
    user_id: string
    hashtags: string[],
    medias: string[]
    mentions: string[],
    audience: number,
    user_views: number,
    guest_views: number,
    updated_at: Date,
    created_at: Date,
    like_count: number,
    likes: {
        status?: boolean
    }
    user: [{
        name?: string,
        username?: string,
        avatar?: string,
        bio?: string
    }],
    bookmark:{
        status?:boolean
    }
}
