
import { cn } from '../../helps/cn';


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
export const ListIcons = ({ handleSelectIcon }: { handleSelectIcon: (icon: string) => Promise<void> }) => {
    return <div className="w-[280px] py-[5px] flex items-center rounded-[50px] bg-white justify-center" style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.15)' }} >
        {
            listIcons.map(Icon => {
                return <div className={cn(' cursor-pointer mx-[10px] text-[25px] hover:p-1 hover:transition hover:ease-in-out hover:delay-50 hover:bg-[#D9D9D9] hover:rounded-[50%]')} onClick={() => handleSelectIcon(Icon.icon)} key={Icon.id}>{Icon.icon}</div>
            })
        }
    </div>
}