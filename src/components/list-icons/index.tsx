
import { useRef, useContext } from 'react';
import { cn } from '../../helps/cn';
import { useClickOutSide } from '../../hooks/useClickOutSide';
import { ContextAPI } from '../../hooks';

const listIcons = [{
    icon: '👍',
    id: 1
},
{
    icon: '😂',
    id: 2,
}, {
    icon: '❤️',
    id: 3
}, {
    icon: '😌',
    id: 4
},
{
    icon: '😢',
    id: 5
}]

export interface ShowPopupIcons {
    handleShowPopupIcons: () => void
}
interface TProps {
    handleSelectIcon: (icon: string) => Promise<void>
}
export const ListIcons = ({ handleSelectIcon }:TProps) => {
    const {setIsHovered}= useContext(ContextAPI)
    const refListIcon = useRef<HTMLDivElement>(null)
    useClickOutSide({
        onClickOutSide: () => setIsHovered(''),
        ref: refListIcon
    })
    


    return  <div className="max-w-[250px] py-[5px] flex items-center rounded-[50px] bg-white justify-center px-[10px]" style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.15)' }} ref={refListIcon} >
        {
            listIcons.map(Icon => {
                return <div className={cn(' cursor-pointer mx-[7px] text-[25px] hover:p-1 hover:transition hover:ease-in-out hover:delay-50 hover:bg-[#D9D9D9] hover:rounded-[50%]')} onClick={() => handleSelectIcon(Icon.icon)} key={Icon.id}>{Icon.icon}</div>
            })
        }
    </div>
}
