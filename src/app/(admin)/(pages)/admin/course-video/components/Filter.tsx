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

interface FilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  priceFilter: string;
  onPriceFilterChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  searchTerm,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Tìm kiếm khóa học"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Mức giá</InputLabel>
          <Select
            value={priceFilter}
            label="Mức giá"
            onChange={(e) => onPriceFilterChange(e.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="under5m">Dưới 5 triệu</MenuItem>
            <MenuItem value="5m-10m">5 - 10 triệu</MenuItem>
            <MenuItem value="over10m">Trên 10 triệu</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default Filter;

