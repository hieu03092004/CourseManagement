API:client/quizz/getQuestion/{id}
parameter:id tương ứng với id quiz_attemps_id của Table 
1 list cac ban ghi của Table question ứng với quiz_id
từ quiz_id truy van 1 list cac ban ghi của Table question ứng với quiz_id
CREATE TABLE `question` (
  `question_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `true_answer` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;"
sau đó dựa vào question_id truy van ra 1 list các bản ghi trong Table answer
 CREATE TABLE `answer` (
  `answer_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
struct data FE cần 
[
    {
      "id" (question_id)BE: 1,
      "quizId" (quiz_id ben BE): 1,
      "question" content Table question  bên BE: "HTML là viết tắt của...?",
      "answers": [
        (content Table answer BE)"Hyperlinks and Text Markup Language" ,
        (content Table answer BE)"Home Tool Markup Language",
       (content Table answer BE) "Hyper Text Markup Language"
      ],
      "correctAnswer": 2
    },
    {
      "id": 2,
      "quizId": 1,
      "question": "Ai là người đưa ra các tiêu chuẩn Web?",
      "answers": [
        "Tổ chức World Wide Web Consortium (W3C)",
        "Apple",
        "Google",
        "Microsoft"
      ],
      "correctAnswer": 0
    },
    {
      "id": 3,
      "quizId": 1,
      "question": "Thẻ nào dùng để nhúng video trong HTML5?",
      "answers": [
        "<video>",
        "<media>",
        "<movie>"
      ],
      "correctAnswer": 0
    },
    {
      "id": 4,
      "quizId": 1,
      "question": "Thuộc tính nào của phần tử media cho phép phát tự động?",
      "answers": [
        "controls",
        "autoplay",
        "loop",
        "muted"
      ],
      "correctAnswer": 1
    },
    {
      "id": 5,
      "quizId": 1,
      "question": "API nào của HTML5 hỗ trợ lưu trữ key‑value đồng bộ phía client?",
      "answers": [
        "Web SQL Database",
        "IndexedDB",
        "localStorage",
        "Service Worker"
      ],
      "correctAnswer": 2
    },
    {
      "id": 6,
      "quizId": 1,
      "question": "Phần tử nào định nghĩa nội dung tự chứa, độc lập (ví dụ một bài viết)?",
      "answers": [
        "<section>",
        "<article>",
        "<aside>",
        "<div>"
      ],
      "correctAnswer": 1
    },
    {
      "id": 7,
      "quizId": 1,
      "question": "Thuộc tính nào của thẻ <input> dùng để hiển thị bộ chọn ngày?",
      "answers": [
        "type=\"date\"",
        "type=\"datetime\"",
        "type=\"calendar\"",
        "type=\"time\""
      ],
      "correctAnswer": 0
    }
  ]
API:client/quizz/getQuizzAttemp/{quizzAttempId}
structure Data FE mong muốn
{
        quizId: 1,
        answers: [
          { questionId: 1, userAnswer: 1 },
          { questionId: 2, userAnswer: 1 },
          { questionId: 3, userAnswer: 1 },
          { questionId: 4, userAnswer: 1 },
          { questionId: 5, userAnswer: 1 },
          { questionId: 6, userAnswer: 1 },
          { questionId: 7, userAnswer: 1 },
        ],
        quizzName:9,
      };
prameter:quizzAttempId tương ứng với attribte là quiz_attemps_id của Table quizz_attemps
dựa vào quiz_attemps_id truy van ra các 1 list các question_id và user_choices tương ứng với quiz_attemps_id  
mapping key FE sang attribute Table bên phía BE
userId:
quizId:attribute quizz_id của Table quizz_attemps
questionId:attribute question_id của Table has_question
userAnswer:attribue của user_choices(lưu ý user_choices==0 là sẽ tương ứng với việc người dùng chọn đáp án đầu tiên)
quizzName:tương ứng với attribue title của Table quizz;
CREATE TABLE `quizz` (
  `quiz_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `time_limit` int(11) NOT NULL DEFAULT 0,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `quizz_attemps` (
  `quiz_attemps_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `has_question` (
  `quiz_attemps_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `user_choices` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci; 