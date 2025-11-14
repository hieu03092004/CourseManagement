"use client";
import { use } from "react";
import Section1 from "./Section1";
import TopicList from "../../components/Topic/TopicList";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
interface Review {
  userName: string;
  comment: string;
  rating: number;
}

interface Lesson {
  id: number;
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
const fetchCourseData = (id: string) => {
  console.log(id);
  const data: CourseData = {
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
            id: 1,
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
            id: 2,
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
export default function CourseDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const courseData = fetchCourseData(id);

  const totalLessons = courseData.topics.reduce((acc, topic) => acc + topic.lessons.length, 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Section1
          courseId={id}
          title={courseData.title}
          description={courseData.description}
          rating={courseData.rating}
          reviewsCount={courseData.reviews.length}
          totalLessons={totalLessons}
          totalStudents={courseData.studentCount}
          status="active"
        />
        <TopicList topics={courseData.topics} />
      </div>
    </div>
  );
}

