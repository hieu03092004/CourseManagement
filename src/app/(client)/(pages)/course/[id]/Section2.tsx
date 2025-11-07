"use client";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaComments, FaRegStar, FaStar, FaUserGraduate } from "react-icons/fa6";
type props = { rating: number };
export default function ({ rating }: props) {
  return (
    <>
      <div className="herro-banner bg-primary h-auto text-white flex items-center justify-start pb-8">
        <div className=" pt-4 herro-content mx-[135px] px-[8] w-1/2">
          <div className=" font-bold herro-title text-[30px]">
            Học Lập Trình C qua 170 bài giảng, 350 bài tập thực hành và 200 câu
            trắc nghiệm (Update 2025)
          </div>
          <div className="herro-desc text-[13px] pt-4">
            Khóa học lập trình C của 28Tech cung cấp trọng vẹn kiến thức lý
            thuyết và bài tập về ngôn ngữ lập trình C. Học viên được thực hành
            với 320 bài tập lập trình từ cơ bản tới nâng cao và 200 bài tập trắc
            nghiệm củng cố lý thuyết. Học viên sẽ làm bài và chấm bài tự động
            với website Hackerrank, các bài tập đều có lời giải chi tiết và học
            viên sẽ được hỗ trợ giải đáp khi gặp khó khăn.
          </div>
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
              <span className="">78 bình luận</span>
            </li>
            <li className=" flex gap-2 items-center justify-center ">
              <span className="">
                <FaUserGraduate />
              </span>
              <span className="">2157 học viên</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
