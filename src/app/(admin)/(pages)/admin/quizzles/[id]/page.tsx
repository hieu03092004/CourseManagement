"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Quiz } from "../../interfaces/quiz";

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockQuizzes: Quiz[] = [
      {
        id: "1",
        lessonName: "Giới thiệu về React",
        quizName: "Quiz cơ bản React",
        courseName: "Lập trình React",
        status: "active",
        questions: [
          {
            id: "q1",
            question: "React là gì?",
            answers: [
              { id: "a1", content: "Thư viện JavaScript", isCorrect: true },
              { id: "a2", content: "Ngôn ngữ lập trình", isCorrect: false },
              { id: "a3", content: "Framework CSS", isCorrect: false },
              { id: "a4", content: "Database", isCorrect: false },
            ],
          },
          {
            id: "q2",
            question: "JSX là gì?",
            answers: [
              { id: "a1", content: "JavaScript XML", isCorrect: true },
              { id: "a2", content: "Java Syntax", isCorrect: false },
              { id: "a3", content: "JSON Extended", isCorrect: false },
              { id: "a4", content: "JavaScript Express", isCorrect: false },
            ],
          },
        ],
      },
      {
        id: "2",
        lessonName: "Hooks trong React",
        quizName: "Quiz về React Hooks",
        courseName: "Lập trình React",
        status: "active",
        questions: [
          {
            id: "q1",
            question: "useState dùng để làm gì?",
            answers: [
              { id: "a1", content: "Quản lý state", isCorrect: true },
              { id: "a2", content: "Xử lý side effect", isCorrect: false },
              { id: "a3", content: "Tạo context", isCorrect: false },
              { id: "a4", content: "Gọi API", isCorrect: false },
            ],
          },
        ],
      },
      {
        id: "3",
        lessonName: "Node.js cơ bản",
        quizName: "Quiz Node.js",
        courseName: "Lập trình Node.js",
        status: "inactive",
        questions: [
          {
            id: "q1",
            question: "Node.js chạy trên môi trường nào?",
            answers: [
              { id: "a1", content: "Server", isCorrect: true },
              { id: "a2", content: "Browser", isCorrect: false },
              { id: "a3", content: "Mobile", isCorrect: false },
              { id: "a4", content: "Desktop", isCorrect: false },
            ],
          },
        ],
      },
    ];

    // Find quiz by id
    const foundQuiz = mockQuizzes.find((q) => q.id === params.id);
    setQuiz(foundQuiz || null);
    setLoading(false);
  }, [params.id]);

  const getStatusDisplay = (status: Quiz["status"]) => {
    const statusMap = {
      active: { label: "Hoạt động", color: "success" as const },
      inactive: { label: "Không hoạt động", color: "error" as const },
    };
    return statusMap[status];
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!quiz) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Không tìm thấy bài quiz
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/admin/quizzles")}
          sx={{ mt: 2 }}
        >
          Quay lại
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/admin/quizzles")}
        sx={{ mb: 3 }}
      >
        Quay lại danh sách
      </Button>

      <Paper sx={{ p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: "var(--color-primary)" }}>
              {quiz.quizName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <strong>Bài học:</strong> {quiz.lessonName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <strong>Khóa học:</strong> {quiz.courseName}
            </Typography>
          </Box>
          <Chip
            label={getStatusDisplay(quiz.status).label}
            color={getStatusDisplay(quiz.status).color}
            size="medium"
          />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Câu hỏi và đáp án
        </Typography>

        {quiz.questions.map((question, qIndex) => (
          <Paper
            key={question.id}
            variant="outlined"
            sx={{ p: 3, mb: 3, bgcolor: "#f5f5f5" }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Câu {qIndex + 1}: {question.question}
            </Typography>

            <List dense sx={{ mt: 2 }}>
              {question.answers.map((answer, aIndex) => (
                <ListItem
                  key={answer.id}
                  sx={{
                    bgcolor: answer.isCorrect ? "#4caf50" : "white",
                    color: answer.isCorrect ? "white" : "inherit",
                    borderRadius: 1,
                    mb: 1,
                    border: "1px solid",
                    borderColor: answer.isCorrect ? "#4caf50" : "#e0e0e0",
                    py: 1.5,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight={answer.isCorrect ? 600 : 400}>
                        {String.fromCharCode(65 + aIndex)}. {answer.content}
                      </Typography>
                    }
                    secondary={
                      answer.isCorrect ? (
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255, 255, 255, 0.9)", mt: 0.5 }}
                        >
                          ✓ Đáp án đúng
                        </Typography>
                      ) : null
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary">
            Chỉnh sửa
          </Button>
          <Button variant="outlined" color="error">
            Xóa bài quiz
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

