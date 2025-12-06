import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

type CourseItem = {
  id: string;
  quizName: string;
  [key: string]: any;
};

interface FilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  courseFilter: string;
  onCourseFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  courses: CourseItem[];
}

const Filter: React.FC<FilterProps> = ({
  searchTerm,
  onSearchChange,
  courseFilter,
  onCourseFilterChange,
  statusFilter,
  onStatusFilterChange,
  courses,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Tìm kiếm tên bài quiz"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Quiz</InputLabel>
          <Select
            value={courseFilter}
            label="Khóa học"
            onChange={(e) => onCourseFilterChange(e.target.value as string)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            {courses.map((course) => (
              <MenuItem
                key={course.id ?? course.quizName}
                value={course.quizName}
              >
                {course.quizName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={statusFilter}
            label="Trạng thái"
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="active">Hoạt động</MenuItem>
            <MenuItem value="inactive">Không hoạt động</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default Filter;




