import { type SetStateAction } from 'react';

import { FaThumbsUp, FaHeart, FaLaugh, FaAngry } from 'react-icons/fa';
import { cn } from '../../helps/cn';
import { type Dispatch } from '@reduxjs/toolkit';

const listIcons = [{
    icon: FaThumbsUp,
    id: 1
},
{
    icon: FaHeart,
    id: 2,
}, {
    icon: FaLaugh,
    id: 3
}, {
    icon: FaAngry,
    id: 4
}]
export const ListIcons = ({setIcon}:{setIcon: Dispatch<SetStateAction<string>>}) => {
    //  const [icon, setIcon] = useState<string>('')
    const handleSelectIcon = (icon: string) => setIcon(icon)
    return <div className="w-[280px] py-[5px] flex items-center rounded-[50px] bg-white px-[15px]" style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.15)' }} >
        {
            listIcons.map(Icon => {
                return <div className={cn('text-[#039CFC] cursor-pointer mx-[13px]', {
                    'text-[#039CFC]': Icon.id === 1,
                    'text-[#F44D65]': Icon.id === 2,
                    'text-[#F7B42D]': Icon.id === 3 || Icon.id === 4,
                })} onClick={() => handleSelectIcon(Icon.icon)} key={Icon.id}><Icon.icon size={35} /></div>
            })
        }
    </div>
}