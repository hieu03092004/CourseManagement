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
  TableSortLabel,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Quiz } from "../../interfaces/quiz";

type SortOrder = "asc" | "desc";

interface TableProps {
  quizzes: Quiz[];
  onViewDetails: (quiz: Quiz) => void;
  onDelete: (quiz: Quiz) => void;
  page: number;
  onPageChange: (page: number) => void;
}

interface HeadCell {
  id: keyof Quiz | "stt";
  label: string;
  sortable: boolean;
}

const headCells: HeadCell[] = [
  { id: "stt", label: "STT", sortable: false },
  { id: "lessonName", label: "Tên bài học", sortable: true },
  { id: "quizName", label: "Tên bài quiz", sortable: true },
  { id: "status", label: "Trạng thái", sortable: true },
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
  const [orderBy, setOrderBy] = React.useState<keyof Quiz>("quizName");
  const [order, setOrder] = React.useState<SortOrder>("asc");

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

  const handleRequestSort = (property: keyof Quiz) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sort function
  const sortedQuizzes = React.useMemo(() => {
    return [...quizzes].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) {
        return order === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [quizzes, order, orderBy]);

  // Calculate the current page's data
  const paginatedQuizzes = sortedQuizzes.slice(
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
                {headCell.sortable && headCell.id !== "stt" ? (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => handleRequestSort(headCell.id as keyof Quiz)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                ) : (
                  headCell.label
                )}
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


