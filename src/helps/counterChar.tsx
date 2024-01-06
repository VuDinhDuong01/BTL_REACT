export interface CounterCharProps {
    maxChar: number
    countChar: number
    error?: string
}

export const CountChar = ({ maxChar, countChar, error }: CounterCharProps) => {
    return <div className="w-full flex items-center justify-between mt-[3px]">
        <span className="text-error font-fontFamily text-[14px] ">{error ?? ''}</span>
        {
            countChar > 0 &&  <div className="text-black3 font-fontFamily text-[14px] font-[700]">{`${countChar} / ${maxChar}`}</div>
        }
       
    </div>
}