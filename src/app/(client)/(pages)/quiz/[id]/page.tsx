"use client";
import { use, useState } from "react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Quiz {
  id: number;
  title: string;
}

interface QuizAttempt {
  id: number;
  quizTitle: string;
  attemptDate: string;
}

const getQuizzes = (id: string): Quiz[] => {
  //   const response = await fetch(`http://localhost:3002/quizzes?courseId=${id}`);
  //   const data = await response.json();
  const dataQuizzes = [
    { id: 1, title: "HTML5" },
    { id: 2, title: "CSS3" },
    { id: 3, title: "Javascript" },
    { id: 4, title: "ReactJS" },
  ];
  return dataQuizzes;
};

const getQuizAttempts = (id: string): QuizAttempt[] => {
  //   const response = await fetch(`http://localhost:3002/quiz-attempts?userId=1&courseId=${id}`);
  //   const data = await response.json();
  const dataAttempts = [
    { id: 1, quizTitle: "HTML5", attemptDate: "2024-01-15" },
    { id: 2, quizTitle: "CSS3", attemptDate: "2024-01-16" },
    { id: 3, quizTitle: "Javascript", attemptDate: "2024-01-17" },
  ];
  return dataAttempts;
};

export default function QuizPage({ params }: PageProps) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<"quizzes" | "attempts">("quizzes");
  const quizzes = getQuizzes(id);
  const attempts = getQuizAttempts(id);
  //   console.log("Course ID from URL:", id);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto rounded-b-lg">
        {/* Tab Navigation */}
        <div className="flex mb-[40px] justify-center">
            <button
              onClick={() => setActiveTab("quizzes")}
              className={`min-w-[251px] h-[48px] px-[24px] py-[12px] text-base font-medium leading-[150%] text-center transition-colors rounded-l-[100px] ${
                activeTab === "quizzes"
                  ? "bg-secondary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Quizzes
            </button>
            <button
              onClick={() => setActiveTab("attempts")}
              className={`w-[251px] h-[48px] px-[24px] py-[12px] text-base font-medium leading-[150%] text-center transition-colors rounded-r-[100px] ${
                activeTab === "attempts"
                  ? "bg-secondary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Quizzes Attempts
            </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg shadow overflow-hidden">
          {activeTab === "quizzes" ? (
            // Tab 1: Danh sách các bài kiểm tra
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên chủ đề
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizzes.map((quiz, index) => (
                  <tr key={quiz.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quiz.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link href={`/questions/${quiz.id}`}>
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Làm bài
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // Tab 2: Lịch sử làm bài
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên chủ đề
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attempts.map((attempt, index) => (
                  <tr key={attempt.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {attempt.quizTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {attempt.attemptDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link href={`/results/${attempt.id}`}>
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Xem chi tiết
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

