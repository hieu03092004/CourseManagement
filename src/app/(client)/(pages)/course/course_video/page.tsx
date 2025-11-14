import CourseList from "@/app/(client)/components/Course/CourseList";
import BreadCump from "@/app/(client)/components/BreadCump/BreadCump";
const sampleCourses = [
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

export default function CourseVideoList() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Khoá học qua video", href: "/course/course_video", active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCump items={breadcrumbItems} />
      <CourseList courses={sampleCourses} />
    </div>
  );
}