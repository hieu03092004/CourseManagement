import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  TablePagination,
  TableSortLabel,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Order } from "../../interfaces/order";

type SortOrder = "asc" | "desc";

interface TableProps {
  orders: Order[];
  selected: Set<string>;
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (order: Order) => void;
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
}

interface HeadCell {
  id: keyof Order;
  label: string;
  sortable: boolean;
}

const headCells: HeadCell[] = [
  { id: "orderCode", label: "Mã đơn hàng", sortable: true },
  { id: "amount", label: "Tiền", sortable: true },
  { id: "orderDate", label: "Ngày đặt hàng", sortable: true },
  { id: "status", label: "Trạng thái", sortable: true },
];

const getStatusDisplay = (status: Order["status"]) => {
  const statusMap = {
    pending: { label: "Chờ thanh toán", color: "warning" as const },
    completed: { label: "Chờ thanh toán", color: "success" as const },
    cancelled: { label: "Đã hủy", color: "error" as const },
  };
  return statusMap[status];
};

const formatDateTime = (dateString: string) => {
  const [time, date] = dateString.split(" - ");
  return `${time} - ${date}`;
};

const Table: React.FC<TableProps> = ({
  orders,
  selected,
  onSelect,
  onSelectAll,
  onViewDetails,
  loading,
  page,
  onPageChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = React.useState<string | null>(null);
  const [rowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = React.useState<keyof Order>("orderCode");
  const [order, setOrder] = React.useState<SortOrder>("asc");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleViewDetails = (order: Order) => {
    handleMenuClose();
    onViewDetails(order);
  };

  const handleRequestSort = (property: keyof Order) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sort function
  const sortedOrders = React.useMemo(() => {
    return [...orders].sort((a, b) => {
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
  }, [orders, order, orderBy]);

  // Calculate the current page's data
  const paginatedOrders = sortedOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={
                  selected.size === orders.length && orders.length > 0
                }
                indeterminate={
                  selected.size > 0 && selected.size < orders.length
                }
                onChange={onSelectAll}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>
                {headCell.sortable ? (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => handleRequestSort(headCell.id)}
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
          {paginatedOrders.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>
                <Checkbox
                  checked={selected.has(item.id)}
                  onChange={() => onSelect(item.id)}
                />
              </TableCell>
              <TableCell>
                {item.orderCode}
              </TableCell>
              <TableCell>
                {item.amount.toLocaleString("vi-VN")} VNĐ
              </TableCell>
              <TableCell>{formatDateTime(item.orderDate)}</TableCell>
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
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
      <TablePagination
        component="div"
        count={orders.length}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} của ${count}`
        }
      />
      {loading && (
        <CircularProgress sx={{ display: "block", m: 2, mx: "auto" }} />
      )}
    </TableContainer>
  );
};

export default Table;
