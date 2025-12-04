 Structure Data FE mong muốn
 [
    {
      id: "1",
      title:
        "Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Thực Hành (Update 2025)",
      price: 1200000,
      image: "/src/assets/images/course_img_demo.png",
    },
    {
      id: "2",
      title:
        "Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Thực Hành (Update 2025)",
      price: 1200000,
      image: "/src/assets/images/course_img_demo.png",
    },
    {
      id: "3",
      title:
        "Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Thực Hành (Update 2025)",
      price: 1200000,
      image: "/src/assets/images/course_img_demo.png",
    },
    {
      id: "4",
      title:
        "Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Thực Hành (Update 2025)",
      price: 1200000,
      image: "/src/assets/images/course_img_demo.png",
    },
  ];
Logic lấy cardId từ trong cookie
API client/cart/{id}
method:get
parameters id chính là cart_id của Table cart
Structure Table cart
CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=ut
sau đó dựa vào cart_id truy vấn ra các  bản ghi có courses_id tương ứng trong table cart_item
Structure Table cart_item
CREATE TABLE `cart_item` (
  `cart_id` int(11) NOT NULL,
  `courses_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
sau đó lấy các courses_id đã có để truy vấn thông tin khoá học
Structure Table courses
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
title:ứng với attribute title của TABLE courses
description:ứng với attribute description của Table courses
image:ứng với attribute image của Table courses

