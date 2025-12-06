"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { get } from "@/app/(admin)/ultils/request";
import { handleResponse } from "@/helpers/api/response/handleResponse";
import { IApiResponse } from "@/helpers/api/response/IResponse";
import { getCookie } from "@/app/(client)/helpers/cookie";

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

interface QuizAttemptResponse {
  id: number;
  quizTitle: string;
  attemptDate: string;
}

export default function QuizPage({ params }: PageProps) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<"quizzes" | "attempts">("quizzes");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorAttempts, setErrorAttempts] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await get(`/client/quizz/detail/${id}`) as IApiResponse<Quiz[]>;
        const { isSuccess, data, error: responseError } = handleResponse(response);

        if (isSuccess && data) {
          setQuizzes(data);
        } else {
          const errorMessage = responseError?.message || "Không thể tải danh sách quiz";
          setError(errorMessage);
          console.error("Error fetching quizzes:", responseError);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi tải danh sách quiz";
        setError(errorMessage);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuizzes();
    }
  }, [id]);

  useEffect(() => {
    const fetchQuizAttempts = async () => {
      const userId = getCookie("id");
      if (!userId) {
        setErrorAttempts("Vui lòng đăng nhập để xem lịch sử làm bài");
        setLoadingAttempts(false);
        return;
      }

      if (!id) {
        setErrorAttempts("Không tìm thấy thông tin bài học");
        setLoadingAttempts(false);
        return;
      }

      try {
        setLoadingAttempts(true);
        setErrorAttempts(null);

        const response = await get(`/client/quizz/getQuizzAttemp/${userId}/${id}`) as IApiResponse<QuizAttemptResponse[]>;
        const { isSuccess, data, error: responseError } = handleResponse(response);

        if (isSuccess && data) {
          // BE đã trả về đúng format, không cần map lại
          setAttempts(data);
        } else {
          const errorMessage = responseError?.message || "Không thể tải lịch sử làm bài";
          setErrorAttempts(errorMessage);
          console.error("Error fetching quiz attempts:", responseError);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi tải lịch sử làm bài";
        setErrorAttempts(errorMessage);
        console.error("Error:", err);
      } finally {
        setLoadingAttempts(false);
      }
    };

    if (activeTab === "attempts" && id) {
      fetchQuizAttempts();
    }
  }, [activeTab, id]);

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
        <div className="bg-white rounded-b-lg shadow overflow-hidden animate-tab-fade-in" key={activeTab}>
          {activeTab === "quizzes" ? (
            // Tab 1: Danh sách các bài kiểm tra
            <>
              {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <p className="text-gray-600">Đang tải danh sách quiz...</p>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <p className="text-red-600">Lỗi: {error}</p>
                </div>
              ) : quizzes.length === 0 ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <p className="text-gray-600">Không có quiz nào</p>
                </div>
              ) : (
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
              )}
            </>
          ) : (
            // Tab 2: Lịch sử làm bài
            <>
              {loadingAttempts ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <p className="text-gray-600">Đang tải lịch sử làm bài...</p>
                </div>
              ) : errorAttempts ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <p className="text-red-600">Lỗi: {errorAttempts}</p>
                </div>
              ) : attempts.length === 0 ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <p className="text-gray-600">Chưa có lịch sử làm bài nào</p>
                </div>
              ) : (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

