import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Quiz } from "../../interfaces/IQuiz";

interface TableProps {
  quizzes: Quiz[];
  onViewDetails: (quiz: Quiz) => void;
  onDelete: (quiz: Quiz) => void;
  page: number;
  onPageChange: (page: number) => void;
}

interface HeadCell {
  id: string;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "stt", label: "STT" },
  { id: "lessonName", label: "Tên bài học" },
  { id: "quizName", label: "Tên bài quiz" },
  { id: "status", label: "Trạng thái" },
];

const getStatusDisplay = (status: Quiz["status"]) => {
  const statusMap = {
    active: { label: "Hoạt động", color: "success" as const },
    inactive: { label: "Không hoạt động", color: "error" as const },
  };
  return statusMap[status];
};

const Table: React.FC<TableProps> = ({
  quizzes,
  onViewDetails,
  onDelete,
  page,
  onPageChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = React.useState<string | null>(null);
  const [rowsPerPage] = React.useState(10);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleViewDetails = (quiz: Quiz) => {
    handleMenuClose();
    onViewDetails(quiz);
  };

  const handleDelete = (quiz: Quiz) => {
    handleMenuClose();
    onDelete(quiz);
  };

  // Calculate the current page's data
  const paginatedQuizzes = quizzes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>
                {headCell.label}
              </TableCell>
            ))}
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedQuizzes.map((item, index) => (
            <TableRow key={item.id} hover>
              <TableCell>{page * rowsPerPage + index + 1}</TableCell>
              <TableCell>{item.lessonName}</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>{item.quizName}</TableCell>
              <TableCell>
                <Chip
                  label={getStatusDisplay(item.status).label}
                  color={getStatusDisplay(item.status).color}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleMenuOpen(e, item.id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={menuId === item.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleViewDetails(item)}>
                    Xem chi tiết
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(item)}>
                    Xóa bài quiz
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
      <TablePagination
        component="div"
        count={quizzes.length}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} của ${count}`
        }
      />
    </TableContainer>
  );
};

export default Table;




