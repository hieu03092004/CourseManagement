Structure Data được gọi bên FE như sau
export interface Course {
  id: string;
  name: string;
  description: string;
  instructor: string;
  lectures: number;
  students: number;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  image: string;
}
const mockCourses: Course[] = [
      {
        id: "1",
        name: "Lập trình Python cơ bản",
        description:
          "Khóa học giới thiệu về ngôn ngữ lập trình Python, từ cơ bản đến nâng cao.",
        instructor: "Nguyễn Văn A",
        lectures: 24,
        students: 120,
        reviews: 350,
        price: 7000000,
        originalPrice: 14000000,
        image: "/src/assets/images/course_img_demo.png",
      },
      {
        id: "2",
        name: "Thiết kế Web với React",
        description:
          "Học cách xây dựng ứng dụng web hiện đại sử dụng React và các công nghệ liên quan.",
        instructor: "Trần Thị B",
        lectures: 30,
        students: 85,
        reviews: 280,
        price: 8000000,
        originalPrice: 16000000,
        image: "/src/assets/images/course_img_demo.png",
      },
      {
        id: "3",
        name: "Phân tích dữ liệu với Python",
        description:
          "Khóa học về phân tích và trực quan hóa dữ liệu sử dụng Python.",
        instructor: "Lê Văn C",
        lectures: 36,
        students: 65,
        reviews: 200,
        price: 9000000,
        originalPrice: 18000000,
        image: "/src/assets/images/course_img_demo.png",
      },
      {
        id: "4",
        name: "Machine Learning cơ bản",
        description: "Giới thiệu về Machine Learning và các thuật toán cơ bản.",
        instructor: "Phạm Thị D",
        lectures: 40,
        students: 90,
        reviews: 450,
        price: 10000000,
        originalPrice: 20000000,
        image: "/src/assets/images/course_img_demo.png",
      },
      {
        id: "5",
        name: "JavaScript nâng cao",
        description: "Khóa học JavaScript từ cơ bản đến nâng cao.",
        instructor: "Hoàng Thị E",
        lectures: 28,
        students: 150,
        rating: 4.6,
        reviews: 320,
        price: 4500000,
        originalPrice: 9000000,
        image: "/src/assets/images/course_img_demo.png",
      },
      {
        id: "6",
        name: "Node.js Backend Development",
        description: "Xây dựng ứng dụng backend với Node.js và Express.",
        instructor: "Nguyễn Văn F",
        avavatarInstructor:""
        lectures: 35,
        students: 95,
        rating: 4.7,
        reviews: 280,
        price: 12000000,
        originalPrice: 24000000,
        image: "/src/assets/images/course_img_demo.png",
      },
    ];
 API :/admin/course/getAll()
 Method:GET
Mapping value các key của FE tương ứng với BE
id: courses_id(Table courses),
name:title(Table courses)
description:description(Table courses)
instructor:username(Table user) tuong ung voi user_id của Table courses
avavatarInstructor:avt(Table User) tuong ung voi user_id của Table courses
lectures:số lượng bản ghi trong(Table lesson) với course_id chính là course_id của (Table courses)
students:số lượng bản ghi với của Table orders nhưng với điều kiện payment_status:success và bản ghi phải có courses_id tương ứng với course_id của Table courses
reviews:số lượng bản ghi của Table Review tương ứng với course_id(Table Course)
price:price của Table courses
discount_percent:được tính toán thông qua price và discount_percent
Structure  của các bảng liên quan:
CREATE TABLE `courses` (
  `courses_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `target` text DEFAULT NULL,
  `result` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `type` varchar(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `discount_percent` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `password_hash` varchar(50) NOT NULL,
  `avt` varchar(255) DEFAULT NULL,
  `gender` varchar(5) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'scheduled',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `course_modules` (
  `courses_modules_id` int(11) NOT NULL,
  `courses_id` int(11) NOT NULL,
  `order_index` smallint(6) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `lesson` (
  `lesson_id` int(11) NOT NULL,
  `courses_modules_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `video_url` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `order_index` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `orders` (
  `orders_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` decimal(12,2) NOT NULL,
  `payment_status` varchar(10) NOT NULL DEFAULT 'pending',
  `payment_time` datetime DEFAULT NULL,
  `cancel_reason` text DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `order_item` (
  `courses_id` int(11) NOT NULL,
  `orders_id` int(11) NOT NULL,
  `unit_price` decimal(12,2) NOT NULL,
  `expired_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `courses_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `context` text NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
