export const URL_API = {
    REGISTER: 'register',
    LOGIN: 'login',
    VERIFY_EMAIL: 'email_verify_token',
    LOGOUT_OUT: 'logout',
    CONFIRM_EMAIL: 'forgot_password',
    CONFIRM_CODE: 'forgot_password',
    RESET_PASSWORD: 'reset_password',
    REFRESH_TOKEN: 'refresh_token',
    LOGOUT: 'logout',
    GET_ME: 'me',
    UPDATE_ME: 'update_me',
    UPLOAD_IMAGE: 'upload_image',
    CHANGE_PASSWORD: 'change_password',
    CREATE_TWEET: 'tweet',
    GET_LIST_TWEET: 'tweet',
    LIKE_TWEET: 'like',
    UN_LIKE_TWEET: 'unlike',
    CREATE_BOOKMARK: 'bookmark',
    UN_BOOKMARK: 'delete_bookmark',
    GET_BOOKMARK: 'bookmark',
    GET_COMMENT:'comment',
    LIKE_COMMENT:'like_comment',
    CREATE_COMMENT:'create_comment',
    CREATE_REPLIES_COMMENT:'replies_comment',
    UPDATE_COMMENT:'update_replies_comment',
    UPLOAD_VIDEO:'upload_video',
    GET_USERS:'get_user',
    FOLLOW:'follow',
    GET_FOLLOW:'get_follow',
    GET_TWEET_USER:'get_tweet_user',
    GET_CONVERSATION:'conversations',
    TWEET_DETAIL:'tweet',
    GET_SEARCH_USER:'get_search_user',
    GET_NOTIFICATION:'notification'
} as const 