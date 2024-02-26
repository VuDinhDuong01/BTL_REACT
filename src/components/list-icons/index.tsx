import { type SetStateAction } from 'react';


import { cn } from '../../helps/cn';
import { type Dispatch } from 'react';

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
export const ListIcons = ({ setIcon }: { setIcon: Dispatch<SetStateAction<string>> }) => {
    const handleSelectIcon = (icon: string) => {
        setIcon(icon)
    }
   
    return <div className="w-[280px] py-[5px] flex items-center rounded-[50px] bg-white justify-center" style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.15)' }} >
        {
            listIcons.map(Icon => {
                return <div className={cn(' cursor-pointer mx-[10px] text-[25px]')} onClick={() => handleSelectIcon(Icon.icon)} key={Icon.id}>{Icon.icon}</div>
            })
        }
    </div>
}