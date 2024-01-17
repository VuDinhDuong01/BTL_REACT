import { Post } from "../../components/post"
import { PostArticle } from "../../components/post-article"
import { cn } from "../../helps/cn"
import { useState } from "react"

const actionArray = [
  { id: 1, title: 'For you' },
  { id: 2, title: 'Following' }
]
export const Home = () => {
  const [optionAction, setOptionAction] = useState<number>(1)
  const handleOptionAction = (action: number) => {
    setOptionAction(action)
  }
  console.log(optionAction)
  return (
    <div className="w-full">
      <div className="grid grid-cols-12  min-w-[611px] z-[99] bg-white border-b-[1px] h-[55px]  items-center  justify-between fixed top-0  border-solid  border-white1 border-t-transparent border-l-transparent border-r-transparent">
        {
          actionArray.map((action) => (
            <div className={cn("col-span-6 h-full w-full relative", {
              "after:absolute after:bottom-0 after:left-0 after:h-[12px] after:w-full z-[999] after:rounded-[2px] after:bg-green2": action.id === optionAction,
            })} key={action.id}>
              <div onClick={() => handleOptionAction(action.id)} className="h-full text-[18px] flex items-center justify-center cursor-pointer font-[700] font-fontFamily hover:bg-white1">
                <div className="">{action.title}</div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="mt-[55px]">
        <PostArticle />
      </div>
      <Post />
      <Post />

    </div>
  )
}
