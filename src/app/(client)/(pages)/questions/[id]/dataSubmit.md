day la structure data FE
{
  "quizId": 9,
  "userId": 1,
  "answers": [
    {
      "questionId": 15,
      "choice": 1
    },
    {
      "questionId": 17,
      "choice": 2
    }
  ]
}
API:client/quizz/create
METHOD:POST
logic nhu sau
insert bang ghi moi Table quizz_attemps
structure Table quizz_attemps
CREATE TABLE `quizz_attemps` (
  `quiz_attemps_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
Sau đó insert vào Table has_question các bản ghi ứng với quiz_attemps_id vừa mới được tạo với question_id ứng với key questionId mà FE gửi lên,attribute user_choice ứng với key choice từ FE gửi lên
structure Table has_question
CREATE TABLE `has_question` (
  `quiz_attemps_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `user_choices` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

