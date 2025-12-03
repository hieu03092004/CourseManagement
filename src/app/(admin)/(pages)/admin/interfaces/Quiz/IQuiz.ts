export interface QuizAnswer {
  id: string;
  content: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
}

export interface Quiz {
  id: string;
  lessonName: string;
  quizName: string;
  courseName: string;
  status: "active" | "inactive";
  questions?: QuizQuestion[];
}

export interface BackendAnswer {
  answerId: number;
  answerName: string;
}

export interface BackendQuestion {
  questionId?: number;
  questionName: string;
  answers: BackendAnswer[];
  trueAnswer: number;
}

export interface BackendQuizData {
  id: number | string;
  lessonName: string;
  quizName: string;
  courseName: string;
  status: string;
  questions: BackendQuestion[];
}

export interface QuizOption {
  id: string;
  text: string;
  originalAnswerId?: number;
}

export interface QuizCard {
  id: string;
  question: string;
  options: QuizOption[];
  correctOption: string;
  originalQuestionId?: number;
  questionId?: number;
}