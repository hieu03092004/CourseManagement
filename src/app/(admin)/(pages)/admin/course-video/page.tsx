"use client";
import { useEffect, useState } from "react";
import { Typography, Button, Stack, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Link from "next/link";
import Filter from "./components/Filter";
import CardList from "./components/CardList";
import { Course } from "../interfaces/CourseVideo/ICourseVideo";
import { get } from "../../../ultils/request";
import { handleResponse, getErrorMessage } from "../../../../../helpers/api/response/handleResponse";
import { IApiResponse } from "../../../../../helpers/api/response/IResponse";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const result = await get('/admin/courses/getAll') as IApiResponse<Course[]>;
      const { isSuccess, data, error } = handleResponse(result);
      
      if (isSuccess && data) {
        setCourses(data);
        setFilteredCourses(data);
      } else {
        const errorMessage = error?.message || 'Có lỗi xảy ra khi tải danh sách khóa học!';
        console.error("Error:", error);
        alert(errorMessage);
        setCourses([]);
        setFilteredCourses([]);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error:", error);
      alert(errorMessage);
      setCourses([]);
      setFilteredCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [refreshTrigger]);

  const handleCourseDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Filter courses based on search and price
  useEffect(() => {
    let result = courses;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (course) =>
          course.name.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term) ||
          course.instructor.toLowerCase().includes(term)
      );
    }

    // Price filter
    if (priceFilter !== "all") {
      result = result.filter((course) => {
        if (priceFilter === "under5m") {
          return course.price < 5000000;
        } else if (priceFilter === "5m-10m") {
          return course.price >= 5000000 && course.price <= 10000000;
        } else if (priceFilter === "over10m") {
          return course.price > 10000000;
        }
        return true;
      });
    }

    setFilteredCourses(result);
  }, [courses, searchTerm, priceFilter]);

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4">Danh sách khóa học</Typography>
        <Link href="/admin/course-video/create" passHref>
          <Button variant="contained" startIcon={<AddIcon />}>
            Thêm khóa học
          </Button>
        </Link>
      </Stack>

      <Filter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priceFilter={priceFilter}
        onPriceFilterChange={setPriceFilter}
      />

      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1">Đang tải dữ liệu...</Typography>
        </Box>
      ) : (
        <CardList courses={filteredCourses} onCourseDeleted={handleCourseDeleted} />
      )}
    </Box>
  );
};

export default CoursesPage;
