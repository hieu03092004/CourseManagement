import React from "react";
import { Box } from "@mui/material";
import CardItem from "./CardItem";
import { Course } from "../../../interfaces/course";

interface CardListProps {
  courses: Course[];
}

const CardList: React.FC<CardListProps> = ({ courses }) => {
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
        <CardItem key={course.id} course={course} />
      ))}
    </Box>
  );
};

export default CardList;

