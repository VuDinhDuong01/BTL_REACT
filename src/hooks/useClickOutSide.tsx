/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect } from 'react'

/**
 * Create mulit signature wallet function
 * @param ref  ref of element
 * @param onClickOutSide  function 
 * @returns  Return multisig wallet address
 */

interface OutSideProps {
    onClickOutSide: () => void,
    ref: RefObject<any>
}

export const useClickOutSide = ({ onClickOutSide, ref }: OutSideProps) => {
    useEffect(() => {
        const handleClickOutSide = (event: Event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutSide && onClickOutSide()
            }
        }
        document.addEventListener('mousedown', handleClickOutSide, true)
        document.addEventListener('touchstart', handleClickOutSide, true)
        return () => {
            document.removeEventListener('mousedown', handleClickOutSide, true)
            document.removeEventListener('touchstart', handleClickOutSide, true)
        }
    }, [onClickOutSide, ref])
}