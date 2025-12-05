"use client";
import { use, useState, useEffect, useRef } from "react";
import { get } from "@/app/(admin)/ultils/request";
import { handleResponse } from "@/helpers/api/response/handleResponse";
import { IApiResponse } from "@/helpers/api/response/IResponse";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Question {
  id: number;
  question: string;
  answers: string[];
}

interface QuizData {
  timeLimit: number;
  questions: Question[];
}

export default function QuestionsPage({ params }: PageProps) {
  const { id } = use(params);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Fetch quiz data on mount
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await get(`/client/question/detail/${id}`) as IApiResponse<QuizData>;
        const { isSuccess, data, error: responseError } = handleResponse(response);

        if (isSuccess && data) {
          setTimeLeft(data.timeLimit);
          setQuestions(data.questions);
        } else {
          const errorMessage = responseError?.message || "Không thể tải dữ liệu bài kiểm tra";
          setError(errorMessage);
          console.error("Error fetching quiz data:", responseError);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi tải bài kiểm tra";
        setError(errorMessage);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuizData();
    }
  }, [id]);

  // Countdown timer
  useEffect(() => {
    // Chỉ chạy timer khi đã load xong data
    if (questions.length === 0) return;

    if (timeLeft === 0) {
      // Tự động submit khi hết thời gian
      submitButtonRef.current?.click();
      return;
    }

    if (timeLeft < 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format data theo cấu trúc backend
    const payload = {
      quizId: parseInt(id),
      userId: 1, // Fix cứng userId = 1
      answers: Object.entries(selectedAnswers).map(([questionId, choice]) => ({
        questionId: parseInt(questionId),
        choice: choice,
      })),
    };

    console.log("Payload JSON:");
    console.log(JSON.stringify(payload, null, 2));

    // TODO: Gửi lên backend
    // const response = await fetch(`http://localhost:3002/quiz-results`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });

    alert("Đã nộp bài!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài kiểm tra...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Lỗi: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Không có câu hỏi nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Timer - Fixed Position */}
      <div
        className="fixed bg-white shadow-lg rounded-lg px-6 py-4 border-2 border-blue-500"
        style={{ top: "82px", right: "0px" }}
      >
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Thời gian còn lại</p>
          <p
            className={`text-2xl font-bold ${
              timeLeft <= 60 ? "text-red-600" : "text-blue-600"
            }`}
          >
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Bài kiểm tra
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((question, qIndex) => (
              <div
                key={question.id}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Câu {qIndex + 1}: {question.question}
                </h3>

                <div className="space-y-3">
                  {question.answers.map((answer, aIndex) => (
                    <label
                      key={aIndex}
                      className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={aIndex}
                        checked={selectedAnswers[question.id] === aIndex}
                        onChange={() => handleAnswerChange(question.id, aIndex)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">{answer}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button
                ref={submitButtonRef}
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-md"
              >
                Nộp bài
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
