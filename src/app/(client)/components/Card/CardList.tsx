import CardItem from "./CardItem";
import { ICourse } from "../../interfaces/ICourse";

export default function CardList() {
  const courses: ICourse[] = [
    {
      id: 1,
      image: "/src/assets/images/course_img_demo.png",
      rating: 5,
      reviewCount: 350,
      title: "Lập trình Node JS",
      lectureCount: 50,
      studentCount: 36,
      startDate: "29/10/2025",
      schedule: "Thứ 2, Thứ 4, Thứ 6",
      time: "21h-23h",
      instructorAvatar: "/src/assets/images/avatar_demo.png",
      instructorName: "Đội ngũ 28 Tech",
      price: 7000000,
      originalPrice: 14000000
    },
    {
      id: 2,
      image: "/src/assets/images/course_img_demo.png",
      rating: 5,
      reviewCount: 420,
      title: "Lập trình React JS",
      lectureCount: 60,
      studentCount: 45,
      startDate: "01/11/2025",
      schedule: "Thứ 3, Thứ 5, Thứ 7",
      time: "19h-21h",
      instructorAvatar: "/src/assets/images/avatar_demo.png",
      instructorName: "Đội ngũ 28 Tech",
      price: 8000000,
      originalPrice: 16000000
    },
    {
      id: 3,
      image: "/src/assets/images/course_img_demo.png",
      rating: 4,
      reviewCount: 280,
      title: "Lập trình Python",
      lectureCount: 45,
      studentCount: 32,
      startDate: "05/11/2025",
      schedule: "Thứ 2, Thứ 4, Thứ 6",
      time: "20h-22h",
      instructorAvatar: "/src/assets/images/avatar_demo.png",
      instructorName: "Đội ngũ 28 Tech",
      price: 6500000,
      originalPrice: 13000000
    },
    {
      id: 4,
      image: "/src/assets/images/course_img_demo.png",
      rating: 5,
      reviewCount: 500,
      title: "Lập trình Java Spring Boot",
      lectureCount: 70,
      studentCount: 58,
      startDate: "10/11/2025",
      schedule: "Thứ 3, Thứ 5, Thứ 7",
      time: "21h-23h",
      instructorAvatar: "/src/assets/images/avatar_demo.png",
      instructorName: "Đội ngũ 28 Tech",
      price: 9000000,
      originalPrice: 18000000
    },
    {
      id: 5,
      image: "/src/assets/images/course_img_demo.png",
      rating: 5,
      reviewCount: 390,
      title: "Lập trình PHP Laravel",
      lectureCount: 55,
      studentCount: 40,
      startDate: "15/11/2025",
      schedule: "Thứ 2, Thứ 4, Thứ 6",
      time: "19h-21h",
      instructorAvatar: "/src/assets/images/avatar_demo.png",
      instructorName: "Đội ngũ 28 Tech",
      price: 7500000,
      originalPrice: 15000000
    },
    {
      id: 6,
      image: "/src/assets/images/course_img_demo.png",
      rating: 4,
      reviewCount: 310,
      title: "Lập trình Mobile React Native",
      lectureCount: 65,
      studentCount: 48,
      startDate: "20/11/2025",
      schedule: "Thứ 3, Thứ 5, Thứ 7",
      time: "20h-22h",
      instructorAvatar: "/src/assets/images/avatar_demo.png",
      instructorName: "Đội ngũ 28 Tech",
      price: 8500000,
      originalPrice: 17000000
    },
    {
      id: 7,
      image: "/src/assets/images/course_img_demo.png",
      rating: 5,
      reviewCount: 460,
      title: "Lập trình C# .NET Core",
      lectureCount: 58,
      studentCount: 52,
      startDate: "25/11/2025",
      schedule: "Thứ 2, Thứ 4, Thứ 6",
      time: "21h-23h",
      instructorAvatar: "/src/assets/images/avatar_demo.png",
      instructorName: "Đội ngũ 28 Tech",
      price: 8200000,
      originalPrice: 16400000
    }
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-[30px] max-w-[1320px] mx-auto px-[7.5px]">
        {courses.map((course) => (
          <CardItem key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}