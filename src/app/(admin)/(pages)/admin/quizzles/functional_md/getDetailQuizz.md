API :/admin/quizz/details/{id}
Parameters:id(tham số id ở đây chính là id của bản ghi trong Table quizz)
Method:GET
{
      id: 9
      lessonName: "Giới thiệu về React",
      quizName: "Quiz cơ bản React",
      courseName: "Lập trình React",
      status: "active",
      questions: [
        {
          questionName: "HTML là viết tắt của...?",
          answers: [
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Text Markup Language",
            "Hyper Text Markup Language",
          ],
          trueAnswer: 2,
        },
        {
          questionName: "Ai là người đưa ra các tiêu chuẩn Web?",
          answers: [
            "Tổ chức World Wide Web Consortium (W3C)",
            "Apple",
            "Google",
            "Microsoft",
          ],
          trueAnswer: 0,
        },
      ],
};
Logic và mapping các key tương ứng của FE với các attribute ứng với các Table trong database
id: id của bản ghi cần truy vấn trong Table 
structure của Table quizz
CREATE TABLE `quizz` (
  `quiz_id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `time_limit` int(11) NOT NULL DEFAULT 0,
  `status` enum('active', 'inactive') NOT NULL DEFAULT 'active',
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
quizName:title(Table quizz) của bản ghi tương ứng với quizz_id cần truy vấn
courseName:title(Table courses)
Logic để lấy được title của Table courses dựa vào quizz_id như sau
quizz_id->lesson_id->courses_modules_id->course_id từ đó suy ra title tương ứng với bản ghi có courses_id cần tìm
Structure các Table liên quan đến logic này
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
CREATE TABLE `quizz` (
  `quiz_id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `time_limit` int(11) NOT NULL DEFAULT 0,
  `status` enum('active', 'inactive') NOT NULL DEFAULT 'active',
)
status:status của bản ghi tương ứng với quizz_id trong Table quizz
các item trong mảng data ứng với key questions

     {
          questionName:content(Table question) dựa vào quiz_id->question_id(từ đó suy ra được content tương ứng với quiz_id)
          answers: [
            value các item ứng với content của từng bản ghi trong TABLE answer
           Logic:quiz_id->question_id sau đó lọc ra các bản ghi Trong Table answer với question_id vừa tìm được sau đó lấy content tương ứng với từng bản ghi đó 
          ],
          trueAnswer: true_answer của Table question,
        },
Structure các Table liên quan
CREATE TABLE `question` (
  `question_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `true_answer` smallint(6) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `answer` (
  `answer_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

