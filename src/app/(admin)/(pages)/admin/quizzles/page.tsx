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
import { Quiz } from "../interfaces/IQuiz";

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
      },
      {
        id: "2",
        lessonName: "Hooks trong React",
        quizName: "Quiz về React Hooks",
        courseName: "Lập trình React",
        status: "active",
      },
      {
        id: "3",
        lessonName: "Node.js cơ bản",
        quizName: "Quiz Node.js",
        courseName: "Lập trình Node.js",
        status: "inactive",
      },
      {
        id: "4",
        lessonName: "Node.js cơ bản",
        quizName: "Quiz Node.js",
        courseName: "Lập trình Node.js",
        status: "inactive",
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

