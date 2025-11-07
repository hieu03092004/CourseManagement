"use client";
import { use, useEffect, useState } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Answer {
  questionId: number;
  userAnswer: number;
}

interface AnswerData {
  userId: number;
  quizId: number;
  answers: Answer[];
  quizAttemptId: number;
}

interface Question {
  id: number;
  quizId: number;
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface ResultItem extends Question {
  userAnswer: number;
}

export default function ResultPage({ params }: PageProps) {
  const { id } = use(params);
  const [dataResult, setDataResult] = useState<ResultItem[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const fetchApi = async () => {
      // Mock data - getAnswer
      const dataAnswer: AnswerData = {
        userId: 5,
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
        quizAttemptId: 15,
      };

      // Mock data - getListQuestions
      const dataQuestions: Question[] = [
        {
          id: 1,
          quizId: 1,
          question: "HTML là viết tắt của...?",
          answers: [
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Text Markup Language",
          ],
          correctAnswer: 2,
        },
        {
          id: 2,
          quizId: 1,
          question: "Ai là người đưa ra các tiêu chuẩn Web?",
          answers: [
            "Tổ chức World Wide Web Consortium (W3C)",
            "Apple",
            "Google",
            "Microsoft",
          ],
          correctAnswer: 0,
        },
        {
          id: 3,
          quizId: 1,
          question: "Thẻ nào dùng để nhúng video trong HTML5?",
          answers: ["<video>", "<media>", "<movie>"],
          correctAnswer: 0,
        },
        {
          id: 4,
          quizId: 1,
          question: "Thuộc tính nào của phần tử media cho phép phát tự động?",
          answers: ["controls", "autoplay", "loop", "muted"],
          correctAnswer: 1,
        },
        {
          id: 5,
          quizId: 1,
          question:
            "API nào của HTML5 hỗ trợ lưu trữ key‑value đồng bộ phía client?",
          answers: [
            "Web SQL Database",
            "IndexedDB",
            "localStorage",
            "Service Worker",
          ],
          correctAnswer: 2,
        },
        {
          id: 6,
          quizId: 1,
          question:
            "Phần tử nào định nghĩa nội dung tự chứa, độc lập (ví dụ một bài viết)?",
          answers: ["<section>", "<article>", "<aside>", "<div>"],
          correctAnswer: 1,
        },
        {
          id: 7,
          quizId: 1,
          question:
            'Thuộc tính nào của thẻ <input> dùng để hiển thị bộ chọn ngày?',
          answers: [
            'type="date"',
            'type="datetime"',
            'type="calendar"',
            'type="time"',
          ],
          correctAnswer: 0,
        },
      ];

      console.log("dataAnswer JSON:", JSON.stringify(dataAnswer, null, 2));
      console.log("dataQuestions JSON:", JSON.stringify(dataQuestions, null, 2));

      let resultFinal: ResultItem[] = [];
      let correct = 0;

      for (let i = 0; i < dataQuestions.length; i++) {
        const userAnswerData = dataAnswer.answers.find(
          (item) => item.questionId === dataQuestions[i].id
        );
        
        const resultItem = {
          ...dataQuestions[i],
          userAnswer: userAnswerData?.userAnswer ?? -1,
        };
        
        if (resultItem.userAnswer === resultItem.correctAnswer) {
          correct++;
        }
        
        resultFinal.push(resultItem);
      }

      setDataResult(resultFinal);
      setCorrectCount(correct);
      setTotalQuestions(dataQuestions.length);
    };

    fetchApi();
  }, [id]);

  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-2xl font-[600] mb-4">
            Kết quả chủ đề: CSS3
          </h1>
          <div className="flex items-center gap-4 mb-2">
            <span>
              Đúng: <span className="font-bold text-green-600">{correctCount}</span>
            </span>
            <span>|</span>
            <span>
              Sai: <span className="font-bold text-red-600">{totalQuestions - correctCount}</span>
            </span>
            <span>|</span>
            <span>
              Tổng số câu: <span className="font-bold">{totalQuestions}</span>
            </span>
            <span>|</span>
            <span>
              Tỷ lệ đúng: <span className="font-bold text-blue-600">{percentage}%</span>
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {dataResult.map((item, index) => {
            const isCorrect = item.userAnswer === item.correctAnswer;
            
            return (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6"
                // style={{
                //   borderLeftColor: isCorrect ? "#10b981" : "#ef4444",
                // }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex-1">
                    Câu {index + 1}: {item.question}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ml-4 ${
                      isCorrect
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isCorrect ? "Đúng" : "Sai"}
                  </span>
                </div>

                <div className="space-y-2">
                  {item.answers.map((itemAns, indexAns) => {
                    const isUserAnswer = item.userAnswer === indexAns;
                    const isCorrectAnswer = item.correctAnswer === indexAns;

                    return (
                      <div
                        key={indexAns}
                        className={`flex items-start p-3 rounded-lg border-1 transition-colors ${
                          isCorrectAnswer
                            ? "border-green-500 bg-green-50"
                            : isUserAnswer
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="radio"
                          checked={isUserAnswer}
                          disabled
                          className="mt-1 h-4 w-4"
                        />
                        <label
                          className={`ml-3 flex-1 ${
                            isCorrectAnswer
                              ? "font-semibold text-green-700"
                              : isUserAnswer
                              ? "font-semibold text-red-700"
                              : "text-gray-700"
                          }`}
                        >
                          {itemAns}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

