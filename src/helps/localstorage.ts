
/* eslint-disable @typescript-eslint/no-explicit-any */
export const LocalStorageEventTarget = new EventTarget()

export const keyLocalStorage = {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    profile: 'profile',
    lng: 'lng',
    checkAdmin: 'admin'
}
export const setLanguageToLS = (lng: string) => {
    return lng ? localStorage.setItem(keyLocalStorage.lng, lng) : localStorage.setItem(keyLocalStorage.lng, 'vi')
}

export const setAccessTokenToLS = (accessToken: string) => {
    return accessToken && localStorage.setItem(keyLocalStorage.access_token, accessToken)
}

export const getAccessTokenToLS = () => {
    return localStorage.getItem(keyLocalStorage.access_token)
}

export const setRefreshTokenToLS = (refreshToken: string) => {
    return refreshToken && localStorage.setItem(keyLocalStorage.refresh_token, refreshToken)
}

export const getRefreshTokenToLS = () => {
    return localStorage.getItem(keyLocalStorage.refresh_token)
}

export const setProfileToLS = ({ user_id, username, avatar }: { user_id: string, username?: string, avatar?: string }) => {
    return user_id && localStorage.setItem(keyLocalStorage.profile, JSON.stringify({ user_id, username, avatar }))
}

export const getProfileToLS = () => {
    return JSON.parse(localStorage.getItem(keyLocalStorage.profile) as string)
}

export const removeLS = () => {
    localStorage.removeItem(keyLocalStorage.profile)
    localStorage.removeItem(keyLocalStorage.access_token)
    localStorage.removeItem(keyLocalStorage.refresh_token)
    localStorage.removeItem(keyLocalStorage.checkAdmin)
    const clearLSEvent = new Event('clearLS')
    LocalStorageEventTarget.dispatchEvent(clearLSEvent)

}

export const setAdminToLS = (value: string) => {
    return value && localStorage.setItem(keyLocalStorage.checkAdmin, value)
}

export const getAdminToLS = () => {
    return localStorage.getItem(keyLocalStorage.checkAdmin)
}


