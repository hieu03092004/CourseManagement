API:
Method:GET
Structure Data FE cần bên BE trả ra
{
    "title": "Học Lập Trình C qua 170 bài giảng, 350 bài tập thực hành và 200 câu trắc nghiệm (Update 2025)",
    "description": "Khóa học lập trình C của 28Tech cung cấp trọng vẹn kiến thức lý thuyết và bài tập về ngôn ngữ lập trình C. Học viên được thực hành với 320 bài tập lập trình từ cơ bản tới nâng cao và 200 bài tập trắc nghiệm củng cố lý thuyết. Học viên sẽ làm bài và chấm bài tự động với website Hackerrank, các bài tập đều có lời giải chi tiết và học viên sẽ được hỗ trợ giải đáp khi gặp khó khăn.",
    "rating": 4,
    "studentCount"  : 2157,
    "reviews":4,
    "topics": [
      {
        "title": "Phần 1:Kiểu dữ liệu, biến, vòng lặp, hàm",
        "orderIndex": 1,
        "lessons": [
          {
            "id": 1,
            "title": "Lập trình C",
            "videoUrl": "/src/assets/videos/1762481529575_487qkl.mp4",
            "duration": 10,
            "orderIndex": 1
          }
        ]
      },
      {
        "title": "Phần 2:Kiểu dữ liệu, biến, vòng lặp, hàm",
        "orderIndex": 2,
        "lessons": [
          {
            "id": 2,
            "title": "Bài 1. Hướng dẫn cài đặt phần mềm DEV C++ để lập trình",
            "videoUrl": "/src/assets/videos/1762481652483_13ndh.mp4",
            "duration": 600,
            "orderIndex": 1
          }
        ]
      }
    ]
}
Mapping value các key của FE tương ứng với BE
name:title(Table courses)
description:description(Table courses)
lectures:số lượng bản ghi trong(Table lesson) với course_id chính là course_id của (Table courses)
studentCount:số lượng bản ghi với của Table orders nhưng với điều kiện payment_status:success và bản ghi phải có courses_id tương ứng với course_id của Table courses
reviews:số lượng bản ghi của Table Review tương ứng với course_id(Table Course)
các item của mảng có key topics
{
    title:title của TABLE `course_modules` ứng với courses_id của TableCourse,
    orderIndex:order_index của TABLE `course_modules ứng với courses_id của TableCourse,
    "lessons": [
          {
            "id": id  của từng bản ghi của Table lesson ứng với courses_modules_id của  TABLE `course_modules` ,
            "title": title(Table lesson ),
            "videoUrl": video_url(Table lesson),
            "duration": duration (Table lesson),
            "orderIndex":order_index(Table lesson)
          }
        ]
}
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


