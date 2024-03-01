
export const PAGE={
    LOGIN:'/login',
    REGISTER:'/register',
    HOME:'/',
    CONFIRM_PASSWORD:'/confirm-password',
    CONFIRM_CODE:'/confirm-code/:user_id',
    RESET_PASSWORD:'/reset-password/:user_id',
    NOTIFICATIONS:'/notifications',
    PERSONAL:'/personal',
    BOOKMARK:'/bookmark/:user_id'
} as const 