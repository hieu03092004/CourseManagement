"use client";
import { useEffect, useState } from "react";
import { Typography, Button, Stack, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Link from "next/link";
import Filter from "./components/Filter";
import CardList from "./components/CardList";
import { Course } from "../interfaces/course";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: "1",
        name: "Lập trình Python cơ bản",
        description:
          "Khóa học giới thiệu về ngôn ngữ lập trình Python, từ cơ bản đến nâng cao.",
        instructor: "Nguyễn Văn A",
        lectures: 24,
        students: 120,
        rating: 4.5,
        reviews: 350,
        price: 7000000,
        originalPrice: 14000000,
        image: "/src/assets/images/course_img_demo.png",
      },
      {
        id: "2",
        name: "Thiết kế Web với React",
        description:
          "Học cách xây dựng ứng dụng web hiện đại sử dụng React và các công nghệ liên quan.",
        instructor: "Trần Thị B",
        lectures: 30,
        students: 85,
        rating: 4.8,
        reviews: 280,
        price: 8000000,
        originalPrice: 16000000,
        image: "/src/assets/images/course_img_demo.png",
      },
      {
        id: "3",
        name: "Phân tích dữ liệu với Python",
        description:
          "Khóa học về phân tích và trực quan hóa dữ liệu sử dụng Python.",
        instructor: "Lê Văn C",
        lectures: 36,
        students: 65,
        rating: 4.7,
        reviews: 200,
        price: 9000000,
        originalPrice: 18000000,
        image: "/src/assets/images/course_img_demo.png",
      },
      {
        id: "4",
        name: "Machine Learning cơ bản",
        description: "Giới thiệu về Machine Learning và các thuật toán cơ bản.",
        instructor: "Phạm Thị D",
        lectures: 40,
        students: 90,
        rating: 4.9,
        reviews: 450,
        price: 10000000,
        originalPrice: 20000000,
        image: "/src/assets/images/course_img_demo.png",
      },
      {
        id: "5",
        name: "JavaScript nâng cao",
        description: "Khóa học JavaScript từ cơ bản đến nâng cao.",
        instructor: "Hoàng Thị E",
        lectures: 28,
        students: 150,
        rating: 4.6,
        reviews: 320,
        price: 4500000,
        originalPrice: 9000000,
        image: "/src/assets/images/course_img_demo.png",
      },
      {
        id: "6",
        name: "Node.js Backend Development",
        description: "Xây dựng ứng dụng backend với Node.js và Express.",
        instructor: "Nguyễn Văn F",
        lectures: 35,
        students: 95,
        rating: 4.7,
        reviews: 280,
        price: 12000000,
        originalPrice: 24000000,
        image: "/src/assets/images/course_img_demo.png",
      },
    ];
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

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

      <CardList courses={filteredCourses} />
    </Box>
  );
};

export default CoursesPage;
