"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { get } from "../../../ultils/request";
import { handleResponse } from "../../../../../helpers/api/response/handleResponse";
import { IApiResponse } from "../../../../../helpers/api/response/IResponse";
import Table from "./components/Table";
import Filter from "./components/Filter";
import { Quiz } from "../interfaces/Quiz/IQuiz";
import { changeStatus } from "./services/changeStatus";
import { deleteQuiz } from "./services/deleteQuiz";

export default function QuizzlesPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch quizzes from API
  const fetchQuizzes = async () => {
    try {
      const response = await get("/admin/quizz/getAll") as IApiResponse<Quiz[]>;
      console.log("Response:", response);
      const { isSuccess, data, error } = handleResponse(response);

      if (isSuccess && data) {
        setQuizzes(data);
        setFilteredQuizzes(data);
      } else {
        console.error("Error:", error);
        const errorMessage = error?.message || 'Có lỗi xảy ra khi tải danh sách quiz!';
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      alert("Có lỗi xảy ra khi tải danh sách quiz!");
    }
  };

  useEffect(() => {
    fetchQuizzes();
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

  const handleDelete = async (quiz: Quiz) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài quiz "${quiz.quizName}"?`)) {
      try {
        const response = await deleteQuiz(quiz.id);
        const { isSuccess, error } = handleResponse(response);

        if (isSuccess) {
          await fetchQuizzes();
          alert(`Xoá bài ${quiz.quizName} thành công`);
        } else {
          const errorMessage = error?.message || "Có lỗi xảy ra khi xóa bài quiz!";
          alert(errorMessage);
        }
      } catch (error) {
        console.error("Error deleting quiz:", error);
        alert("Có lỗi xảy ra khi xóa bài quiz!");
      }
    }
  };

  const handleStatusChange = async (quizId: string, newStatus: "active" | "inactive") => {
    try {
      const response = await changeStatus({
        status: newStatus,
        quizzId: quizId,
      });
      const { isSuccess, error } = handleResponse(response);

      if (isSuccess) {
        await fetchQuizzes();
        alert("Thay đổi trạng thái thành công!");
      } else {
        const errorMessage = error?.message || "Có lỗi xảy ra khi đổi trạng thái!";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error changing status:", error);
      alert("Có lỗi xảy ra khi đổi trạng thái!");
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
        onStatusChange={handleStatusChange}
        page={page}
        onPageChange={setPage}
      />
    </Box>
  );
}

