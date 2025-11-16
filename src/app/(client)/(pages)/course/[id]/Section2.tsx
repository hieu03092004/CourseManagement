"use client";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaComments, FaRegStar, FaStar, FaUserGraduate } from "react-icons/fa6";

type props = {
  rating: number;
  title: string;
  description: string;
  reviewsCount: number;
  studentCount: number;
};

export default function ({
  rating,
  title,
  description,
  reviewsCount,
  studentCount,
}: props) {
  return (
    <>
      <div className="herro-banner bg-primary h-auto text-white flex items-center justify-start pb-8">
        <div className=" pt-4 herro-content mx-[135px] px-[8] w-1/2">
          <div className=" font-bold herro-title text-[30px]">{title}</div>
          <div className="herro-desc text-[13px] pt-4">{description}</div>
          <ul className="stats list-none flex gap-4 mt-8 text-[13px] ">
            <li className="overall-rating flex gap-2 items-center justify-center ">
              <span className="">{rating}</span>
              <span className=" flex gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <FaStar className="" key={i} />
                  ) : rating >= i - 0.5 ? (
                    <FaStarHalfAlt key={i} />
                  ) : (
                    <FaRegStar key={i} />
                  )
                )}
              </span>
            </li>
            <li className="comments flex gap-2 items-center justify-center ">
              <span className=" ">
                <FaComments />
              </span>
              <span className="">{reviewsCount} bình luận</span>
            </li>
            <li className=" flex gap-2 items-center justify-center ">
              <span className="">
                <FaUserGraduate />
              </span>
              <span className="">{studentCount} học viên</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
