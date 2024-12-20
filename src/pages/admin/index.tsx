import React from "react";
import {
  Typography,
} from "@material-tailwind/react";
import StatisticsCard from "../../components/statistics-card";

import { FaUserFriends } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiSolidLike } from "react-icons/bi";
import { useGetAllUserQuery } from "../../apis";
import { useGetAllTweetQuery } from "../../apis/tweet";
import { useGetAllCommentQuery } from "../../apis/comment";
import { useGetAllLikeQuery } from "../../apis/like";
import { Images } from "../../assets/images";

export function Admin() {

  const { data: dataUser } = useGetAllUserQuery({
    page: 1,
    limit: 1000,
  })
  const { data: dataPost } = useGetAllTweetQuery({
    page: 1,
    limit: 1000,
  })
  const { data: dataComment } = useGetAllCommentQuery({
    page: 1,
    limit: 1000,
  })
  const { data: dataLike } = useGetAllLikeQuery({
    page: 1,
    limit: 1000,
  })
  const statisticsCardsData = [
    {
      color: "gray",
      icon: FaUserFriends,
      title: "Tổng số người",
      value: dataUser?.data.length,
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "so với tuần trước",
      },
    },
    {
      color: "gray",
      icon: SiPostman,
      title: "Tổng số bài đăng",
      value: dataPost?.data.length,
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "so với tháng trước",
      },
    },
    {
      color: "gray",
      icon: FaRegCommentDots,
      title: "Tổng lượt bình luận",
      value: dataComment?.data.length,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "so với tuần trước",
      },
    },
    {
      color: "gray",
      icon: BiSolidLike,
      title: "Tổng lượt yêu thích",
      value: dataLike?.data.length,
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "so với tuần trước",
      },
    },
  ];


  return (
    <div className="mt-12 px-[10px]">
      <div className="mb-8 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 font-fontFamily">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-8 h-8 text-green1",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div>
        <img src={Images.admin1} className="w-[100%] h-[500px] rounded-lg" />
      </div>
      <div className="w-full grid grid-cols-3 gap-6 mt-[20px]">
        <div className="w-full col-span-1 ">
          <img src={Images.admin2} className="w-[100%] h-[300px] rounded-lg" />
        </div>
        <div className="w-full col-span-1 ">
          <img src={Images.admin3} className="w-[100%] h-[300px] rounded-lg" />
        </div>
        <div className="w-full col-span-1 ">
          <img src={Images.admin4} className="w-[100%] h-[300px] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default Admin;
