"use client";
import { use, useState, useEffect } from "react";
import { FaPlus, FaCopy, FaTrash } from "react-icons/fa6";
import { Edit as EditIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { getDataQuizDetail } from "../../helpers/getDataQuizDetail";
import { BackendQuestion, QuizCard } from "../../../interfaces/Quiz/IQuiz";
import { post } from "../../../../../ultils/request";
import { handleResponse } from "../../../../../../../helpers/api/response/handleResponse";
import { IApiResponse } from "../../../../../../../helpers/api/response/IResponse";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}


export default function EditQuizzlePage({ params }: PageProps) {
    const { id } = use(params);
    const [quizName, setQuizName] = useState("");
    const [quizCards, setQuizCards] = useState<QuizCard[]>([]);
    const [originalQuestionIds, setOriginalQuestionIds] = useState<number[]>([]);
    const [nextQuestionId, setNextQuestionId] = useState<number>(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadQuizData = async () => {
            try {
                setLoading(true);
                const backendData = await getDataQuizDetail(id);

                if (backendData) {
                    // Lọc và transform data cần thiết cho page edit
                    setQuizName(backendData.quizName || "");

                    const formattedCards: QuizCard[] = backendData.questions.map((q: BackendQuestion, qIndex: number) => {
                        const trueAnswerIndex = Number(q.trueAnswer);
                        const correctAnswer = q.answers[trueAnswerIndex];
                        return {
                            id: q.questionId ? String(q.questionId) : `q${qIndex + 1}`,
                            question: q.questionName || "",
                            options: q.answers.map((answer) => ({
                                id: String(answer.answerId),
                                text: answer.answerName,
                                originalAnswerId: answer.answerId,
                            })),
                            correctOption: correctAnswer ? String(correctAnswer.answerId) : "",
                            originalQuestionId: q.questionId,
                        };
                    });

                    setQuizCards(formattedCards);
                    const questionIds = backendData.questions.map((q) => q.questionId || 0).filter((id) => id > 0);
                    setOriginalQuestionIds(questionIds);
                    const maxQuestionId = questionIds.length > 0 ? Math.max(...questionIds) : 0;
                    setNextQuestionId(maxQuestionId + 1);
                } else {
                    alert("Không tìm thấy dữ liệu quiz!");
                }
            } catch (error) {
                console.error("Error fetching quiz:", error);
                alert("Có lỗi xảy ra khi tải dữ liệu quiz!");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadQuizData();
        }
    }, [id]);

    const addNewCard = () => {
        const currentQuestionId = nextQuestionId;
        const baseId = Date.now().toString();
        const newCard: QuizCard = {
            id: baseId,
            question: "",
            options: [
                { id: `${baseId}-1`, text: "" },
                { id: `${baseId}-2`, text: "" },
                { id: `${baseId}-3`, text: "" },
                { id: `${baseId}-4`, text: "" },
            ],
            correctOption: `${baseId}-1`,
            questionId: currentQuestionId,
        };
        setQuizCards([...quizCards, newCard]);
        setNextQuestionId(currentQuestionId + 1);
    };

    const duplicateCard = (cardId: string) => {
        const cardToDuplicate = quizCards.find((card) => card.id === cardId);
        if (!cardToDuplicate) return;

        const currentQuestionId = nextQuestionId;
        const baseId = Date.now().toString();
        const oldCorrectOptionId = cardToDuplicate.correctOption;
        const oldCorrectOptionIndex = cardToDuplicate.options.findIndex(
            (opt) => opt.id === oldCorrectOptionId
        );

        const newOptions = cardToDuplicate.options.map((opt, index) => ({
            id: `${baseId}-${index + 1}`,
            text: opt.text,
        }));

        const duplicatedCard: QuizCard = {
            id: baseId,
            question: cardToDuplicate.question,
            options: newOptions,
            correctOption: oldCorrectOptionIndex >= 0 ? newOptions[oldCorrectOptionIndex].id : newOptions[0].id,
            questionId: currentQuestionId,
        };

        setQuizCards([...quizCards, duplicatedCard]);
        setNextQuestionId(currentQuestionId + 1);
    };

    const deleteCard = (cardId: string) => {
        if (quizCards.length === 1) return;
        setQuizCards(quizCards.filter((card) => card.id !== cardId));
    };

    const updateQuestion = (cardId: string, question: string) => {
        setQuizCards(
            quizCards.map((card) =>
                card.id === cardId ? { ...card, question } : card
            )
        );
    };

    const updateOption = (cardId: string, optionId: string, text: string) => {
        setQuizCards(
            quizCards.map((card) =>
                card.id === cardId
                    ? {
                        ...card,
                        options: card.options.map((opt) =>
                            opt.id === optionId ? { ...opt, text } : opt
                        ),
                    }
                    : card
            )
        );
    };

    const updateCorrectOption = (cardId: string, optionId: string) => {
        setQuizCards(
            quizCards.map((card) =>
                card.id === cardId ? { ...card, correctOption: optionId } : card
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const currentQuestionIds = quizCards
            .filter((card) => card.originalQuestionId)
            .map((card) => card.originalQuestionId!);
        const deletedQuestionIds = originalQuestionIds.filter(
            (originalId) => !currentQuestionIds.includes(originalId)
        );

        const questionsToCreate: Array<{
            question_id: number;
            content: string;
            answers: Array<{ content: string }>;
            true_answer: number;
        }> = [];

        const questionsToUpdate: Array<{
            question_id: number;
            content: string;
            answers: Array<{
                answer_id?: number;
                content: string;
            }>;
            true_answer: number;
        }> = [];

        quizCards.forEach((card) => {
            const correctAnswerIndex = card.options.findIndex(
                (opt) => opt.id === card.correctOption
            );

            const questionData = {
                content: card.question,
                answers: card.options.map((opt) => ({
                    content: opt.text,
                })),
                true_answer: correctAnswerIndex,
            };

            if (card.originalQuestionId) {
                questionsToUpdate.push({
                    question_id: card.originalQuestionId,
                    content: card.question,
                    answers: card.options.map((opt) => ({
                        answer_id: opt.originalAnswerId,
                        content: opt.text,
                    })),
                    true_answer: correctAnswerIndex,
                });
            } else {
                questionsToCreate.push({
                    question_id: card.questionId || 0,
                    ...questionData,
                });
            }
        });

        const payload = {
            quiz_id: parseInt(id),
            questionsToCreate,
            questionsToUpdate,
            deletedQuestionIds,
        };

        try {
            const response = await post("/admin/quizz/edit", payload) as IApiResponse<unknown>;
            const { isSuccess, error } = handleResponse(response);

            if (isSuccess) {
                alert("Cập nhật bài quiz thành công!");
            } else {
                const errorMessage = error?.message || "Có lỗi xảy ra khi cập nhật bài quiz!";
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Có lỗi xảy ra khi cập nhật bài quiz!");
        }
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="lessonId" value={id} />
                <div className="p-6 bg-gray-50 min-h-screen">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <input
                                type="text"
                                name="QuizName"
                                placeholder="Tên bài quiz"
                                value={quizName}
                                onChange={(e) => setQuizName(e.target.value)}
                                className="w-full text-3xl font-normal border-b border-gray-300 focus:border-[var(--color-main-admin)] outline-none pb-2 mb-4"
                            />
                        </div>

                        <div className="space-y-6">
                            {quizCards.map((card) => (
                                <div key={card.id} className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <input
                                            type="text"
                                            placeholder="Câu hỏi"
                                            value={card.question}
                                            onChange={(e) => updateQuestion(card.id, e.target.value)}
                                            className="flex-1 text-lg border-b-2 border-gray-300 focus:border-[var(--color-main-admin)] outline-none pb-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => addNewCard()}
                                            className="ml-4 w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                        >
                                            <FaPlus className="text-gray-600 text-sm" />
                                        </button>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {card.options.map((option, optIndex) => (
                                            <div key={option.id} className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name={`correct-${card.id}`}
                                                    checked={card.correctOption === option.id}
                                                    onChange={() => updateCorrectOption(card.id, option.id)}
                                                    className="w-5 h-5"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder={`Tùy chọn ${optIndex + 1}`}
                                                    value={option.text}
                                                    onChange={(e) =>
                                                        updateOption(card.id, option.id, e.target.value)
                                                    }
                                                    className="flex-1 border-b border-gray-200 focus:border-[var(--color-main-admin)] outline-none pb-1"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-end items-center gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => duplicateCard(card.id)}
                                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                                            title="Sao chép"
                                        >
                                            <FaCopy className="text-gray-600 text-lg" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteCard(card.id)}
                                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                                            title="Xóa"
                                            disabled={quizCards.length === 1}
                                        >
                                            <FaTrash
                                                className={`text-lg ${quizCards.length === 1
                                                        ? "text-gray-300"
                                                        : "text-gray-600"
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <Button variant="contained" type="submit" startIcon={<EditIcon />}>
                                Cập nhật
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

