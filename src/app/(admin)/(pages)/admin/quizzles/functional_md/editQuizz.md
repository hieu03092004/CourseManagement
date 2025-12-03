API:/admin/quizz/edit
Method:POST
structure Data từ FE gửi lên BE
 {
  "quiz_id": 9,
  "questionsToCreate": [
    {
      "question_id": 16,
      "content": "Test là gì",
      "answers": [
        {
          "content": "Test 1"
        },
        {
          "content": "Test 2"
        },
        {
          "content": "Test 3"
        },
        {
          "content": "CSS 4"
        }
      ],
      "true_answer": 2
    },
    {
      "question_id": 17,
      "content": "Test 2",
      "answers": [
        {
          "content": "T5"
        },
        {
          "content": "t6"
        },
        {
          "content": "t7"
        },
        {
          "content": "t8"
        }
      ],
      "true_answer": 1
    }
  ],
  "questionsToUpdate": [
    {
      "question_id": 14,
      "content": "CSS là gì",
      "answers": [
        {
          "answer_id": 53,
          "content": "CSS 5"
        },
        {
          "answer_id": 54,
          "content": "CSS 6"
        },
        {
          "answer_id": 55,
          "content": "CSS 7"
        },
        {
          "answer_id": 56,
          "content": "CSS 8"
        }
      ],
      "true_answer": 0
    }
  ],
  "deletedQuestionIds": [
    13
  ]
}
Logic BE
với các item trong key questionsToCreate
data của các item này dùng để create các bản ghi mới trong Table question tương ứng với quiz_id
Structure Table question
CREATE TABLE `question` (
  `question_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `true_answer` smallint(6) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
và khi insert vào table question thì không insert value của key question_id vào Table question vì question_id của TABLE `question`
đã là auto increment
Sau khi insert xong vào Table question thì insert các item của key answers vào bảng answer ứng với question_id của bản ghi vừa mới được tạo
Structure Table answers
CREATE TABLE `answer` (
  `answer_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
data của key questionsToUpdate thì logic là query bản ghi tương ứng với question_id đối với Table question ,và query bản ghi với answer_id ứng với Table answer sau đó update lại value của attribute content theo data bên FE gửi lên
còn đối với data của key  deletedQuestionIds chỉ việc xóa bản ghi trong Table question có id như bên data FE gửi lên là được  
