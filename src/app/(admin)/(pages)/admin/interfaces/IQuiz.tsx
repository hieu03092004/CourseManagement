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