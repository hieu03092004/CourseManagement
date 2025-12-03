"use client";
import { use, useState, useRef } from "react";
import { FaPlus, FaCopy, FaTrash } from "react-icons/fa6";
import { Add as AddIcon, AccessTime } from "@mui/icons-material";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { post } from "../../../../../ultils/request";
import { handleResponse, getErrorMessage } from "../../../../../../../helpers/api/response/handleResponse";
import { IApiResponse } from "../../../../../../../helpers/api/response/IResponse";
import QuizManager, { QuizCard } from "../../services/createQuizz";
interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function CreateQuizzlePage({ params }: PageProps) {
    const { id } = use(params);
    const [quizName, setQuizName] = useState("");
    const [timeLimit, setTimeLimit] = useState<number>(0);
    const [timeLimitInput, setTimeLimitInput] = useState<string>("00:00");
    const [openTimeModal, setOpenTimeModal] = useState(false);
    const [quizCards, setQuizCards] = useState<QuizCard[]>([
        {
            id: "1",
            question: "",
            options: [
                { id: "1", text: "" },
                { id: "2", text: "" },
                { id: "3", text: "" },
                { id: "4", text: "" },
            ],
            correctOption: "1",
        },
    ]);
    
    const quizManagerRef = useRef(new QuizManager(quizCards));

    const addNewCard = (afterId: string) => {
        const updatedCards = quizManagerRef.current.addNewCard(afterId);
        setQuizCards([...updatedCards]);
    };

    const duplicateCard = (cardId: string) => {
        const updatedCards = quizManagerRef.current.duplicateCard(cardId);
        setQuizCards([...updatedCards]);
    };

    const deleteCard = (cardId: string) => {
        const updatedCards = quizManagerRef.current.deleteCard(cardId);
        setQuizCards([...updatedCards]);
    };

    const updateQuestion = (cardId: string, question: string) => {
        const updatedCards = quizManagerRef.current.updateQuestion(cardId, question);
        setQuizCards([...updatedCards]);
    };

    const updateOption = (cardId: string, optionId: string, text: string) => {
        const updatedCards = quizManagerRef.current.updateOption(cardId, optionId, text);
        setQuizCards([...updatedCards]);
    };

    const updateCorrectOption = (cardId: string, optionId: string) => {
        const updatedCards = quizManagerRef.current.updateCorrectOption(cardId, optionId);
        setQuizCards([...updatedCards]);
    };

    const convertTimeToSeconds = (timeString: string): number => {
        const parts = timeString.split(":");
        if (parts.length < 2) return 0;
        const hours = parseInt(parts[0]) || 0;
        const minutes = parseInt(parts[1]) || 0;
        const seconds = parts.length === 3 ? (parseInt(parts[2]) || 0) : 0;
        return hours * 3600 + minutes * 60 + seconds;
    };

    const convertSecondsToTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };

    const handleOpenTimeModal = () => {
        setTimeLimitInput(convertSecondsToTime(timeLimit));
        setOpenTimeModal(true);
    };

    const handleCloseTimeModal = () => {
        setOpenTimeModal(false);
    };

    const handleSaveTimeLimit = () => {
        const seconds = convertTimeToSeconds(timeLimitInput);
        setTimeLimit(seconds);
        setOpenTimeModal(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Update quizManager with current cards
        quizManagerRef.current.setCards(quizCards);
        
        // Transform data to backend format
        const payload = quizManagerRef.current.prepareDataForBackend(id, quizName, timeLimit);
        try {
            const response = await post(`/admin/quizz/create/${id}`, payload) as IApiResponse;
            const { isSuccess, error } = handleResponse(response);
            
            if (isSuccess) {
                alert("Tạo bài quiz thành công!");
            } else {
                const errorMessage = error?.message || 'Có lỗi xảy ra khi tạo bài quiz!';
                console.error("Error:", error);
                alert(errorMessage);
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.error("Error:", error);
            alert(errorMessage);
        }
    };

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="lessonId" value={id} />
                <div className="p-6 bg-gray-50 min-h-screen">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex items-center gap-6 mb-4">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Tên bài quiz"
                                    value={quizName}
                                    onChange={(e) => setQuizName(e.target.value)}
                                    className="flex-1 text-3xl font-normal border-b border-gray-300 focus:border-[var(--color-main-admin)] outline-none pb-2"
                                />
                                <Button
                                    type="button"
                                    variant="outlined"
                                    startIcon={<AccessTime />}
                                    onClick={handleOpenTimeModal}
                                    className="shrink-0"
                                >
                                    {timeLimit > 0 ? convertSecondsToTime(timeLimit) : "Thời gian"}
                                </Button>
                            </div>
                        </div>

                        <Dialog open={openTimeModal} onClose={handleCloseTimeModal} maxWidth="sm" fullWidth>
                            <DialogTitle>Thiết lập thời gian làm bài</DialogTitle>
                            <DialogContent>
                                <TextField
                                    type="time"
                                    label="Thời gian làm bài"
                                    value={timeLimitInput}
                                    onChange={(e) => setTimeLimitInput(e.target.value)}
                                    inputProps={{
                                        step: 60,
                                    }}
                                    fullWidth
                                    margin="normal"
                                    helperText={`Tương đương ${convertTimeToSeconds(timeLimitInput)} giây`}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseTimeModal}>Hủy</Button>
                                <Button onClick={handleSaveTimeLimit} variant="contained">
                                    Lưu
                                </Button>
                            </DialogActions>
                        </Dialog>

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
                                            onClick={() => addNewCard(card.id)}
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
                                                    className="w-5 h-5 "
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

                                    <div className="flex justify-end items-center gap-4 pt-4 ">
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
                            <Button variant="contained" type="submit" startIcon={<AddIcon />}> 
                                Tạo bài quiz
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

