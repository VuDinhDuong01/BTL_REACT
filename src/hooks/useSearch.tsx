
import { useEffect, useState } from "react";

/**
 * Create mulit signature wallet function
 * @param delay {String} time delay
 * @param value {String} text 
 * @returns  Return textSearch setTextSearch
 */

export const useSearch = ({ delay, value }: { delay?: number, value: string }) => {
    const [textSearch, setTextSearch] = useState<string>('')
    useEffect(() => {
        const idTimer = setTimeout(() => {
            setTextSearch(value)
        }, delay || 500)
        return () => clearTimeout(idTimer)
    }, [value, delay])

    return { textSearch, setTextSearch }
}