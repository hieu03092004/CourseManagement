API client/question/detai/{quizzId}
structure data FE cần BE trả ra
[
    "timeLimit":120,
    {
      "id": 1,
      "question": "HTML là viết tắt của...?",
      "answers": [
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
        "Hyper Text Markup Language"
      ]
    },
    {
      "id": 2,
      "question": "Ai là người đưa ra các tiêu chuẩn Web?",
      "answers": [
        "Tổ chức World Wide Web Consortium (W3C)",
        "Apple",
        "Google",
        "Microsoft"
      ]
    },
    {
      "id": 3,
      "topicId": 1,
      "question": "Thẻ nào dùng để nhúng video trong HTML5?",
      "answers": [
        "<video>",
        "<media>",
        "<movie>"
      ]
    }
]
mapping các key của FE sang attribute Table ben phia BE
structure TABLE `question` (
  `question_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `true_answer` smallint(6) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
id:tương ứng với attribute question_id của Table question
dựa vào question_id query ra 1 list các bản ghi của Table answer 
structure TABLE `answer` (
  `answer_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
content:tương ứng với attribute của Table content  answer

