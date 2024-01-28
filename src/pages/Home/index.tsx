import { useState } from "react"

import { Post } from "../../components/post"
import { PostArticle } from "../../components/post-article"
import { cn } from "../../helps/cn"

const actionArray = [
  { id: 1, title: 'For you' },
  { id: 2, title: 'Following' }
]
export const Home = () => {
  const [optionAction, setOptionAction] = useState<number>(1)
  const handleOptionAction = (action: number) => {
    setOptionAction(action)
  }
  return (
    <div className="w-full">
      <div className="min-w-[611px] z-[-9999] flex items-center  bg-white border-b-[1px] h-[55px]  justify-between  top-0 border-solid border-white1 border-t-transparent border-l-transparent border-r-transparent">
        {actionArray.map((action) => (
          <div
            className={cn('h-full w-full relative ', {
              'before:content-[""] before:absolute before:-bottom-[2px] before:w-full  before:left-0 before:h-[2px]  before:rounded-[2px] before:bg-green2':
                action.id === optionAction,
            })}
            key={action.id}
          >
            <div
              onClick={() => handleOptionAction(action.id)}
              className="h-full text-[18px] flex items-center justify-center cursor-pointer font-[700] font-fontFamily hover:bg-white1  "
            >
              {action.title}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[55px]">
        <PostArticle />
      </div>
     <div className="!z-[-1]">
     <Post />
     </div>
     

    </div>
  )
}
