API:admin/quizz/getAll
Method:Get
structure data ben FE
   [
    {
        id: "1",
        lessonName: "Giới thiệu về React",
        quizName: "Quiz cơ bản React",
        courseName: "Lập trình React",
        status: "active",
    },
      {
        id: "2",
        lessonName: "Hooks trong React",
        quizName: "Quiz về React Hooks",
        courseName: "Lập trình React",
        status: "active",
      },
      {
        id: "3",
        lessonName: "Node.js cơ bản",
        quizName: "Quiz Node.js",
        courseName: "Lập trình Node.js",
        status: "inactive",
      },
      {
        id: "4",
        lessonName: "Node.js cơ bản",
        quizName: "Quiz Node.js",
        courseName: "Lập trình Node.js",
        status: "inactive",
      },
    ];
Mapping key FE sang attribute Table BE
id:attribute id của Table quizz
CREATE TABLE `quizz` (
  `quiz_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
ALTER TABLE `quizz`
  ADD COLUMN `status` ENUM('active','inactive') NOT NULL DEFAULT 'active' AFTER `lesson_id`;
lessonName:attribute title Table lesson tương ứng với lesson_id  
CREATE TABLE `lesson` (
  `lesson_id` int(11) NOT NULL,
  `courses_modules_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `video_url` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `order_index` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
courseName:title của Table courses
Logic:(quiz_id->lesson_id->courses_modules_id->courses_id) dựa vào logic lấy ra title tương ứng của Table courses
CREATE TABLE `course_modules` (
  `courses_modules_id` int(11) NOT NULL,
  `courses_id` int(11) NOT NULL,
  `order_index` smallint(6) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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


