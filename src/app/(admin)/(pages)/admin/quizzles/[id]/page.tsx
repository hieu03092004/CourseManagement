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
import { Quiz } from "../../interfaces/Quiz/IQuiz";
import { transformedQuiz } from "../services/getQuizDetail";
import { getDataQuizDetail } from "../helpers/getDataQuizDetail";

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const backendData = await getDataQuizDetail(params.id as string);

        if (backendData) {
          setQuiz(transformedQuiz(backendData));
        } else {
          setQuiz(null);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchQuiz();
    }
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

        {quiz.questions?.map((question, qIndex) => (
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push(`/admin/quizzles/edit/${quiz.id}`)}
          >
            Chỉnh sửa
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

