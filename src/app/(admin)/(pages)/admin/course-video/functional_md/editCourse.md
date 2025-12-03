API:/admin/courses/details/{id}
Method:GET
Struture Data FE cần lấy
{
    title: "Lập trình Web với HTML, CSS, JavaScript",
    description: "Khóa học cung cấp kiến thức cơ bản về phát triển web từ HTML, CSS đến JavaScript. Học viên sẽ được thực hành xây dựng các trang web thực tế.",
    target: "Người mới bắt đầu muốn học lập trình web\nHọc viên muốn củng cố kiến thức nền tảng\nNgười chuyển ngành sang IT",
    result: "Xây dựng được website hoàn chỉnh\nNắm vững HTML5, CSS3, JavaScript ES6\nHiểu về responsive design và UI/UX",
    image: "course_online_1.jpg",
    duration: 40,
    price: 1200000,
    type: "video",
    discountPercent: 20,
    rating: 4,
    studentCount : 2157,
    reviews:4,
    topics: [
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
};
Mapping value tương ứng của các key ứng với structure data ben FE sang Table bên BE
Structure Table BE
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
Mapping
title(FE):value(attribute title của Table courses)
description(FE):value(attribute description của Table courses)
target(FE):value(attribute target của  Table courses)
result(FE):value(attribute result của  Table courses)
image(FE):value(attribute image của  Table courses)
price(FE):value(attribute price của  Table courses)
discountPercent:value(attribute discount_percent của  Table courses)
type:value(attribute type của Table courses)


