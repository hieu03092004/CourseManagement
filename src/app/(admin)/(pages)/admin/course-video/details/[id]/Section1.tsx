"use client";
import Link from "next/link";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaComments, FaRegStar, FaStar, FaUserGraduate } from "react-icons/fa6";

type Props = {
    courseId: string;
    title: string;
    description: string;
    rating: number;
    reviewsCount: number;
    totalLessons: number;
    totalStudents: number;
    status: string;
};

export default function Section1({ courseId, title, description, rating, reviewsCount, totalLessons, totalStudents, status }: Props) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-2xl font-bold text-gray-800 mb-4">
                <h1 >{title}</h1>
            </div>
            <div className="herro-desc text-[13px] text-gray-800 mb-4">
                {description}
            </div>
            <ul className="stats list-none flex gap-4 text-[13px] pt-4 border-t border-gray-200">
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
                    <span className="">{totalStudents} học viên</span>
                </li>
            </ul>
        </div>
    );
}

