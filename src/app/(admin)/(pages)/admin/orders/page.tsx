"use client";
import { useState } from "react";
import { Typography, Box } from "@mui/material";
import Table from "./components/Table";
import { Order } from "../interfaces/order";

export default function OrdersPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);
  const [loading] = useState(false);

  // Sample data matching the provided screenshot
  const mockOrders: Order[] = [
    {
      id: "1",
      orderCode: "ORD185760943",
      amount: 1200000,
      orderDate: "14:14 - 06/10/2025",
      status: "completed",
    },
    {
      id: "2",
      orderCode: "ORD526471380",
      amount: 499000,
      orderDate: "18:13 - 05/01/2023",
      status: "cancelled",
    },
    {
      id: "3",
      orderCode: "ORD579084213",
      amount: 499000,
      orderDate: "12:37 - 02/01/2023",
      status: "completed",
    },
    {
      id: "4",
      orderCode: "ORD842370195",
      amount: 699000,
      orderDate: "10:12 - 05/10/2022",
      status: "completed",
    },
    {
      id: "5",
      orderCode: "ORD610934852",
      amount: 699000,
      orderDate: "22:08 - 01/10/2022",
      status: "completed",
    },
  ];

  const handleSelect = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const handleSelectAll = () => {
    if (selected.size === mockOrders.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(mockOrders.map((order) => order.id)));
    }
  };

  const handleViewDetails = (order: Order) => {
    console.log("View details:", order);
    // Implement view details logic
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Danh sách đơn hàng
      </Typography>
      <Table
        orders={mockOrders}
        selected={selected}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onViewDetails={handleViewDetails}
        loading={loading}
        page={page}
        onPageChange={setPage}
      />
    </Box>
  );
}