
export const setLanguageToStorage = (lng: string) => {
    return lng ? localStorage.setItem("lng", lng) : localStorage.setItem("lng", 'vi')
}