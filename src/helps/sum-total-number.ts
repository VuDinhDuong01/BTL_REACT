

/**
 * Create mulit signature wallet function
 * @param account 
 * @returns  Return total number
 */

export const TotalNumber = (value: number) => {
    if (value < 1000) {
        return value
    } else if (value >= 1000 && value < 1000000) {
        return `${value / 1000} K`
    } else {
        return `${value / 1000000} M`
    }
}