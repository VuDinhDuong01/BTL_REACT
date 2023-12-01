/* eslint-disable @typescript-eslint/no-explicit-any */

export const setLanguageToStorage = (lng: string) => {
    return lng ? localStorage.setItem("lng", lng) : localStorage.setItem("lng", 'vi')
}

export const setAccessToken= (accessToken:string )=>{
    return accessToken && localStorage.setItem("access_token",accessToken)
}

export const getAccessToken=()=>{
    return localStorage.getItem("access_token")
}

export const setRefreshToken=(refreshToken:string)=>{
    return refreshToken && localStorage.setItem("refresh_token",refreshToken)
} 

export const getRefreshToken=()=>{
    return localStorage.getItem("refresh_token")
}

export const setProfileToLS=(profile:any)=>{
    return profile && localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileToLS=()=>{
    return localStorage.getItem('profile')
}

export const removeLS=()=>{
    localStorage.removeItem('profile')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}