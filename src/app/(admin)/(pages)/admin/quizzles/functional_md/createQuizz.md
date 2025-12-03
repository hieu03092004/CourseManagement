API:/admin/quizz/create/{lessonId}
Method:POST
structure Data FE gui len
[
  {
    "lessonId": 1,
    "question": "HTML là gì",
    "answers": [
      "HTML 1",
      "HTML 2",
      "HTML 3",
      "HTML 4"
    ],
    "trueAnswer": 0
  },
  {
    "lessonId": 1,
    "question": "SCSS là gì",
    "answers": [
      "SCSS 1",
      "SCSS 2",
      "SCSS 3",
      "SCSS 4"
    ],
    "trueAnswer": 0
  }
]
logic ben BE
lấy value của key lessonId bên FE gửi qua sau đó insert vào Table quizz
Structure TABLE `quizz` (
  `quiz_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
Sau khi insert vao table quizz thi lay quiz_id của bạn ghi vừa mới tạo được 
Sau đó insert vào TABLE `question
Structure  
TABLE `question` (
  `question_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `true_answer` smallint(6) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
mapping các key data gửi lên của FE qua attribute của Table question như sau
content:key question của FE
trueAnswer:key trueAnswer của FE
Sau đó lần lượt insert các item của key answers vào Table answer
Structure Table answer
CREATE TABLE `answer` (
  `answer_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
các item trong key answers của FE gửi lên chính là các bản ghi của Table answer
content:value của các item của key answers
