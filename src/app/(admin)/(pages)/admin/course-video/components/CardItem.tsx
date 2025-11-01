import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { FaStar, FaBook, FaUser } from "react-icons/fa6";
import { Course } from "../../interfaces/course";

interface CardItemProps {
  course: Course;
}

const CardItem: React.FC<CardItemProps> = ({ course }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        component="img"
        src={course.image}
        alt={course.name}
        sx={{
          width: "100%",
          height: 200,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ display: "flex", gap: 0 }}>
            <FaStar style={{ fontSize: "13px", color: "#FF9747" }} />
            <FaStar style={{ fontSize: "13px", color: "#FF9747" }} />
            <FaStar style={{ fontSize: "13px", color: "#FF9747" }} />
            <FaStar style={{ fontSize: "13px", color: "#FF9747" }} />
            <FaStar style={{ fontSize: "13px", color: "#FF9747" }} />
          </Box>
          <Typography variant="body2" sx={{ ml: 0.5, fontSize: "14px", fontWeight: 500 }}>
            ({course.reviews} đánh giá)
          </Typography>
        </Box>

        <Typography
          gutterBottom
          variant="h6"
          component="h4"
          sx={{ fontSize: "18px", fontWeight: 700, mb: 2, color: "var(--color-primary)" }}
        >
          {course.name}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 1.25 }}>
            <FaBook style={{ fontSize: "13px", color: "var(--color-secondary)", marginRight: "5px" }} />
            <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 700, mr: 0.5, color: "var(--color-body)" }}>
              {course.lectures}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "13px", color: "var(--color-body)" }}>
              Bài Giảng
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mb: 1.25 }}>
            <FaUser style={{ fontSize: "13px", color: "var(--color-secondary)", marginRight: "5px" }} />
            <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 700, mr: 0.5, color: "var(--color-body)" }}>
              {course.students}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "13px", color: "var(--color-body)" }}>
              Học viên
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Box
            component="img"
            src="/src/assets/images/avatar_demo.png"
            alt={course.instructor}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid",
              borderColor: "primary.main",
            }}
          />
          <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 500, color: "var(--color-heading)" }}>
            {course.instructor}
          </Typography>
        </Stack>

        <Box>
          <Typography variant="h6" component="span" sx={{ fontSize: "16px", fontWeight: 700, color: "var(--color-main)" }}>
            {course.price.toLocaleString("vi-VN")}
          </Typography>
          <Typography variant="body2" component="span" sx={{ fontSize: "16px", fontWeight: 700, color: "var(--color-main)" }}>
            đ
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{
              ml: 1,
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "line-through",
              opacity: 0.5,
              color: "var(--color-black)",
            }}
          >
            {course.originalPrice.toLocaleString("vi-VN")}
            <span>đ</span>
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Xem chi tiết</Button>
        <Button size="small" color="primary">
          Chỉnh sửa
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;

