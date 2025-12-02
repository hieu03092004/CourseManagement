import React from "react";
import { Box } from "@mui/material";
import CardItem from "./Card/CardItem";
import { Course } from "../../interfaces/CourseVideo/ICourseVideo";

export interface CardListProps {
  courses: Course[];
  onCourseDeleted?: () => void;
}

const CardList: React.FC<CardListProps> = ({ courses, onCourseDeleted }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 3,
        mt: 3,
      }}
    >
      {courses.map((course) => (
        <CardItem key={course.id} course={course} onCourseDeleted={onCourseDeleted} />
      ))}
    </Box>
  );
};

export default CardList;

