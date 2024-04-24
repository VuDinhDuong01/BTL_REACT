
export const PAGE={
    LOGIN:'/login',
    REGISTER:'/register',
    HOME:'/',
    CONFIRM_PASSWORD:'/confirm-password',
    CONFIRM_CODE:'/confirm-code/:user_id',
    RESET_PASSWORD:'/reset-password/:user_id',
    NOTIFICATIONS:'/notifications/:user_id',
    PERSONAL:'/personal/:user_id',
    BOOKMARK:'/bookmark/:user_id',
    MESSAGE:'/message',
    MESSAGE_DETAIL:'/message/:receiver_id',
    TWEET_DETAIL:'/tweet/:tweet_id',
    COMMUNITIES:'/communities/:user_id',
    ADMIN:'/admin',
    USER:'/admin/all_user',
    POST: '/admin/all_post',
    LIKE:'/admin/all_like',
    COMMENT:'/admin/all_comment'

} as const 