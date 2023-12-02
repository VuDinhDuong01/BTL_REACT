/* eslint-disable @typescript-eslint/no-explicit-any */

export const  keyLocalStorage={
    access_token:'access_token',
    refresh_token:'refresh_token',
    profile:'profile',
    lng:'lng'
}
export const setLanguageToLS = (lng: string) => {
    return lng ? localStorage.setItem(keyLocalStorage.lng, lng) : localStorage.setItem(keyLocalStorage.lng, 'vi')
}

export const setAccessTokenToLS= (accessToken:string )=>{
    return accessToken && localStorage.setItem(keyLocalStorage.access_token,accessToken)
}

export const getAccessTokenToLS=()=>{
    return localStorage.getItem(keyLocalStorage.access_token)
}

export const setRefreshTokenToLS=(refreshToken:string)=>{
    return refreshToken && localStorage.setItem(keyLocalStorage.refresh_token,refreshToken)
} 

export const getRefreshTokenToLS=()=>{
    return localStorage.getItem(keyLocalStorage.refresh_token)
}

export const setProfileToLS=(profile:any)=>{
    return profile && localStorage.setItem(keyLocalStorage.profile, JSON.stringify(profile))
}

export const getProfileToLS=()=>{
    return localStorage.getItem(keyLocalStorage.profile)
}

export const removeLS=()=>{
    localStorage.removeItem(keyLocalStorage.profile)
    localStorage.removeItem(keyLocalStorage.access_token)
    localStorage.removeItem(keyLocalStorage.refresh_token)
}