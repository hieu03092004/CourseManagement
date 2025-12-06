
API:client/quizz/getQuizzAttemp/{userId}/{lessonId}
structure Data BE tra ra
{
"success": true,

"data": [

{
"id": 6,
"quizTitle": "CSS 3",
"attemptDate": "2025-12-06"
},

{
"id": 5,
"quizTitle": "Trắc nghiệm về HTML",
"attemptDate": "2025-12-06"
}
],

"error": null,

"meta": null
}
prameter:userId tương ứng với attribte là user_id ,user_id được lấy từ key userId bên cookie của FE,dua vao lessonId là param trên FE http://localhost:3000/quiz/8 8 ở đây chính là lessonId truy van ra 1 list cac bai quizz tuong ung lessonId 
sau đó lọc ra 1 list các bản ghi của  quizz_attemps ứng với user_id và quizz_id
key id bên FE tương ứng với quiz_attemps_id
quizTitle tương ứng với title của Table quizz
attemptDate tương ứng với created_at của Table quizz_attemps

CREATE TABLE `quizz_attemps` (
  `quiz_attemps_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `quizz` (
  `quiz_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `time_limit` int(11) NOT NULL DEFAULT 0,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;|
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




