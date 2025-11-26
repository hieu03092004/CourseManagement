"use client";
import { use, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa6";
import { Edit as EditIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { patch } from "../../../../../ultils/request";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

interface QuizOption {
    id: string;
    text: string;
}

interface QuizCard {
    id: string;
    question: string;
    options: QuizOption[];
    correctOption: string;
}

interface RawQuestion {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: number;
}

interface QuizResponse {
    name: string;
    questions: RawQuestion[];
}

// Mock data function
const fetchQuizData = (id: string): QuizResponse => {
    // Data fix cứng cho testing
    return {
        name: "Quiz HTML5 & CSS3",
        questions: [
            {
                id: 1,
                question: "HTML là viết tắt của từ gì?",
                answers: [
                    "Hyper Text Markup Language",
                    "Home Tool Markup Language",
                    "Hyperlinks and Text Markup Language",
                    "Hyperlinking Text Marking Language"
                ],
                correctAnswer: 0
            },
            {
                id: 2,
                question: "CSS là viết tắt của từ gì?",
                answers: [
                    "Computer Style Sheets",
                    "Cascading Style Sheets",
                    "Creative Style Sheets",
                    "Colorful Style Sheets"
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                question: "Thẻ nào dùng để tạo đường link trong HTML?",
                answers: [
                    "<link>",
                    "<a>",
                    "<href>",
                    "<url>"
                ],
                correctAnswer: 1
            }
        ]
    };
};

export default function EditQuizzlePage({ params }: PageProps) {
    const { id } = use(params);
    const [quizName, setQuizName] = useState("");
    const [quizCards, setQuizCards] = useState<QuizCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadQuizData =  () => {
            try {
                // Sử dụng mock data thay vì API call
                const response = fetchQuizData(id);
                
                setQuizName(response.name || "");
                
                const formattedCards = response.questions.map((q: RawQuestion, index: number) => ({
                    id: q.id?.toString() || index.toString(),
                    question: q.question || "",
                    options: q.answers?.map((answer: string, idx: number) => ({
                        id: (idx + 1).toString(),
                        text: answer
                    })) || [],
                    correctOption: ((q.correctAnswer || 0) + 1).toString()
                }));
                
                setQuizCards(formattedCards);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setLoading(false);
                alert("Có lỗi xảy ra khi tải dữ liệu quiz!");
            }
        };

        loadQuizData();
    }, [id]);

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

        const payload = quizCards.map((card, index) => {
            const correctAnswerIndex = card.options.findIndex(
                (opt) => opt.id === card.correctOption
            );

            return {
                lessonId: parseInt(id),
                question: card.question,
                answers: card.options.map((opt) => opt.text),
                correctAnswer: correctAnswerIndex,
                orderIndex: index + 1,
            };
        });
        console.log("Payload:", JSON.stringify(payload, null, 2));

        // try {
        //     const response = await patch(`quizzes/${id}`, payload);
        //     console.log("Response:", response);
        //     alert("Cập nhật bài quiz thành công!");
        // } catch (error) {
        //     console.error("Error:", error);
        //     alert("Có lỗi xảy ra khi cập nhật bài quiz!");
        // }
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

