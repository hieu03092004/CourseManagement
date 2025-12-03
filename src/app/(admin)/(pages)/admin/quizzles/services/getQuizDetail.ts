import { Quiz, BackendQuizData } from "../../interfaces/Quiz/IQuiz";

export const transformedQuiz = (backendData: BackendQuizData): Quiz => {
  return {
    id: String(backendData.id),
    lessonName: backendData.lessonName,
    quizName: backendData.quizName,
    courseName: backendData.courseName,
    status: backendData.status as "active" | "inactive",
    questions: backendData.questions.map((q, qIndex) => {
      const trueAnswerIndex = Number(q.trueAnswer);
      return {
        id: q.questionId ? String(q.questionId) : `q${qIndex + 1}`,
        question: q.questionName,
        answers: q.answers.map((answer, aIndex) => {
          const isCorrect = aIndex === trueAnswerIndex;
          return {
            id: String(answer.answerId),
            content: answer.answerName,
            isCorrect,
          };
        }),
      };
    }),
  };
};
