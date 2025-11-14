"use client";
import { useState, useEffect } from "react";
import CourseList from "@/app/(client)/components/Course/CourseList";
import BreadCump from "@/app/(client)/components/BreadCump/BreadCump";

interface Course {
  id: string;
  name: string;
  description: string;
  instructor: string;
  lectures: number;
  students: number;
  duration: string;
  price: number;
  originalPrice: number;
  image: string;
  discount?: number;
  isFeatured?: boolean;
}

const fetchMyCourses = async (): Promise<Course[]> => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/member/courses');
  // const data = await response.json();
  // return data;

  // Mock data for now
  return [
    {
      id: "1",
      name: "Học Lập Trình C qua 170 bài giảng, 350 bài tập thực hành và 200 câu trắc nghiệm (Update 2025)",
      description: "Khóa học lập trình C của 28Tech cung cấp trọng vẹn kiến thức lý thuyết và bài tập",
      instructor: "28Tech",
      lectures: 170,
      students: 2163,
      duration: "150 giờ",
      price: 1200000,
      originalPrice: 2750000,
      image: "/src/assets/images/course_online_1.jpg",
      isFeatured: true,
    },
    {
      id: "2",
      name: "Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Thực Hành (Update 2025)",
      description: "Khóa học với 120 bài học và 300 bài tập luyện tập",
      instructor: "28Tech",
      lectures: 120,
      students: 1654,
      duration: "56 giờ",
      price: 1200000,
      originalPrice: 2750000,
      image: "/src/assets/images/course_online_2.jpg",
      isFeatured: true,
    },
  ];
};

export default function MemberCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const data = await fetchMyCourses();
      setCourses(data);
      setLoading(false);
    };
    loadCourses();
  }, []);

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Thông tin cá nhân", href: "/member/dashboard" },
    { label: "Khóa học đã mua", href: "/member/courses", active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCump items={breadcrumbItems} />
      {loading ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <p className="text-gray-600">Đang tải khóa học...</p>
          </div>
        </div>
      ) : courses.length > 0 ? (
        <CourseList courses={courses} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <p className="text-gray-600">Bạn chưa có khóa học nào.</p>
          </div>
        </div>
      )}
    </div>
  );
}

