interface BookmarkProps {
    tweet_id: string
}

interface BookmarkResponse {
    like_count: number,
    bookmark: [
        {
            _id:string,
            content:string,
            user_id: string,
            hashtags: string[],
            mentions:string [],
            medias: string[]
            audience: number,
            user_views: number,
            guest_views: number,
          
        }
    ],
}