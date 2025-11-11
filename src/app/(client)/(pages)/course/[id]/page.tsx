"use client";
import { useState, useEffect } from "react";
import ChapterList from "@/app/(client)/components/Chapter/ChapterList";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

interface Review {
  userName: string;
  comment: string;
  rating: number;
}

interface Lesson {
  title: string;
  videoUrl: string;
  duration: number;
  orderIndex: number;
}

interface Topic {
  title: string;
  orderIndex: number;
  lessons: Lesson[];
}

interface CourseData {
  title: string;
  description: string;
  rating: number;
  studentCount: number;
  reviews: Review[];
  topics: Topic[];
}

const fetchCourseData = () => {
  let data: CourseData = {
    title: "Học Lập Trình C qua 170 bài giảng, 350 bài tập thực hành và 200 câu trắc nghiệm (Update 2025)",
    description: "Khóa học lập trình C của 28Tech cung cấp trọng vẹn kiến thức lý thuyết và bài tập về ngôn ngữ lập trình C. Học viên được thực hành với 320 bài tập lập trình từ cơ bản tới nâng cao và 200 bài tập trắc nghiệm củng cố lý thuyết. Học viên sẽ làm bài và chấm bài tự động với website Hackerrank, các bài tập đều có lời giải chi tiết và học viên sẽ được hỗ trợ giải đáp khi gặp khó khăn.",
    rating: 4,
    studentCount: 2157,
    reviews: [
      {
        userName: "Nguyễn Văn A",
        comment: "Khoá học chất lượng, cám ơn team 28tech!!",
        rating: 5
      },
      {
        userName: "Nguyễn Văn A",
        comment: "Khoá học chất lượng, cám ơn team 28tech!!",
        rating: 5
      },
      {
        userName: "Nguyễn Văn A",
        comment: "Khoá học chất lượng, cám ơn team 28tech!!",
        rating: 5
      },
      {
        userName: "Nguyễn Văn A",
        comment: "Khoá học chất lượng, cám ơn team 28tech!!",
        rating: 4
      }
    ],
    topics: [
      {
        title: "Phần 1:Kiểu dữ liệu, biến, vòng lặp, hàm",
        orderIndex: 1,
        lessons: [
          {
            title: "Lập trình C",
            videoUrl: "/src/assets/videos/1762481529575_487qkl.mp4",
            duration: 10,
            orderIndex: 1
          }
        ]
      },
      {
        title: "Phần 2:Kiểu dữ liệu, biến, vòng lặp, hàm",
        orderIndex: 2,
        lessons: [
          {
            title: "Bài 1. Hướng dẫn cài đặt phần mềm DEV C++ để lập trình",
            videoUrl: "/src/assets/videos/1762481652483_13ndh.mp4",
            duration: 600,
            orderIndex: 1
          }
        ]
      }
    ]
  };
  return data;
};

export default function CourseDetailPage() {
  const courseData = fetchCourseData();

  return (
    <>
      <div>
        <Section1 />
        <Section2
          rating={courseData.rating}
          title={courseData.title}
          description={courseData.description}
          reviewsCount={courseData.reviews.length}
          studentCount={courseData.studentCount}
        />
        <ChapterList topics={courseData.topics} />
        <Section3
          rating={courseData.rating}
          reviews={courseData.reviews}
        />
      </div>
    </>
  );
}
