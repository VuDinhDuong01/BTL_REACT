import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Create mulit signature wallet function
 * @param input  {String} account name
 * @returns merge classNames
 */

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}