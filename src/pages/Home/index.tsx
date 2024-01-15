import { Post } from "../../components/post"
import { PostArticle } from "../../components/post-article"

export const Home = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 min-w-[611px]  z-[99] bg-white border-b-[1px] h-[55px]  items-center  justify-between fixed top-0  border-solid  border-white1 border-t-transparent border-l-transparent border-r-transparent">
        <div className="col-span-6 h-full text-[18px]  flex items-center justify-center cursor-pointer font-[700] font-fontFamily hover:bg-white1">For you</div>
        <div className=" col-span-6 h-full text-[18px] flex items-center justify-center cursor-pointer font-[700] font-fontFamily hover:bg-white1 ">Following</div>
      </div>
      <div className="mt-[55px]">
        <PostArticle />
      </div>
      <Post />
      <Post />
    </div>
  )
}
