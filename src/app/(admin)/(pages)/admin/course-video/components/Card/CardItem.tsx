import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Stack,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FaStar, FaBook, FaUser } from "react-icons/fa6";
import { FaEllipsisV, FaEye, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Course } from "../../../interfaces/CourseVideo/ICourseVideo";
import Link from "next/link";
import { del } from "../../../../../ultils/request";
import { handleResponse, getErrorMessage } from "../../../../../../../helpers/api/response/handleResponse";
import { IApiResponse } from "../../../../../../../helpers/api/response/IResponse";

interface CardItemProps {
  course: Course;
  onCourseDeleted?: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ course, onCourseDeleted }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    handleClose();
    
    if (!window.confirm(`Bạn có chắc chắn muốn xóa khóa học "${course.name}"?`)) {
      return;
    }

    try {
      const result = await del(`/admin/courses/delete/${course.id}`) as IApiResponse;
      const { isSuccess, error } = handleResponse(result);
      
      if (isSuccess) {
        alert("Xóa khóa học thành công!");
        // Trigger refresh of course list
        if (onCourseDeleted) {
          onCourseDeleted();
        }
      } else {
        const errorMessage = error?.message || 'Có lỗi xảy ra khi xóa khóa học!';
        console.error("Error:", error);
        alert(errorMessage);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error:", error);
      alert(errorMessage);
    }
  };

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
            src={course.avavatarInstructor || "/src/assets/images/avatar_demo.png"}
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
      <CardActions sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-label="More actions"
          aria-controls={open ? "course-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <FaEllipsisV />
        </IconButton>
        <Menu
          id="course-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            component={Link}
            href={`/admin/course-video/details/${course.id}`}
            onClick={handleClose}
          >
            <ListItemIcon>
              <FaEye fontSize="small" />
            </ListItemIcon>
            <ListItemText>Xem chi tiết</ListItemText>
          </MenuItem>
          <MenuItem
            component={Link}
            href={`/admin/course-video/edit/${course.id}`}
            onClick={handleClose}
          >
            <ListItemIcon>
              <FaEdit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Chỉnh sửa</ListItemText>
          </MenuItem>
          <MenuItem
            component={Link}
            href={`/admin/course-video/createLesson/${course.id}`}
            onClick={handleClose}
          >
            <ListItemIcon>
              <FaPlus fontSize="small" />
            </ListItemIcon>
            <ListItemText>Thêm bài giảng</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <FaTrash fontSize="small" style={{ color: "inherit" }} />
            </ListItemIcon>
            <ListItemText>Xóa</ListItemText>
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default CardItem;

