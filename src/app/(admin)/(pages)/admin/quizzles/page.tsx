"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import Table from "./components/Table";
import Filter from "./components/Filter";
import { Quiz } from "../interfaces/quiz";

export default function QuizzlesPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data
  useEffect(() => {
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
    setQuizzes(mockQuizzes);
    setFilteredQuizzes(mockQuizzes);
  }, []);

  // Filter quizzes
  useEffect(() => {
    let result = quizzes;

    if (searchTerm) {
      result = result.filter((quiz) =>
        quiz.quizName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (courseFilter !== "all") {
      result = result.filter((quiz) => quiz.courseName === courseFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((quiz) => quiz.status === statusFilter);
    }

    setFilteredQuizzes(result);
    setPage(0);
  }, [quizzes, searchTerm, courseFilter, statusFilter]);

  const uniqueCourses = Array.from(
    new Set(quizzes.map((quiz) => quiz.courseName))
  );

  const handleViewDetails = (quiz: Quiz) => {
    router.push(`/admin/quizzles/${quiz.id}`);
  };

  const handleDelete = (quiz: Quiz) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài quiz "${quiz.quizName}"?`)) {
      setQuizzes(quizzes.filter((q) => q.id !== quiz.id));
    }
  };

  const handleAddQuiz = () => {
    alert("Chức năng thêm bài quiz đang được phát triển");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4">Quản lý bài quiz</Typography>
      </Stack>

      <Filter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        courseFilter={courseFilter}
        onCourseFilterChange={setCourseFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        courses={uniqueCourses}
      />

      <Table
        quizzes={filteredQuizzes}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
        page={page}
        onPageChange={setPage}
      />
    </Box>
  );
}

