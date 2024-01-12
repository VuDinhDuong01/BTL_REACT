import { Post } from "../../components/post"
import { PostArticle } from "../../components/post-article"

export const Home = () => {
  return (
    <div className="w-full">
      <div className="flex min-w-[611px]  bg-white border-b-[1px] h-[55px]  items-center px-[100px] justify-between fixed top-0   border-solid  border-[#EFF3F4] border-t-transparent border-l-transparent border-r-transparent">
        <h2 className="text-[18px] cursor-pointer font-[700] font-fontFamily">For you</h2>
        <h2 className="text-[18px] cursor-pointer font-[700] font-fontFamily">Following</h2>
      </div>
      <div className="mt-[55px]">
      <PostArticle />
      </div>
     <Post />
     <Post />
    </div>
  )
}
