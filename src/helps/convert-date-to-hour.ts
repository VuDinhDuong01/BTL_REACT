

export const convertDateToHours=(date:string )=>{
    const newDate= new Date(date)
    const getHours= newDate.getHours();
    return getHours
}