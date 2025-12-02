"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import Table from "./components/Table";
import Filter from "./components/Filter";
// import { patch } from "../../../ultils/request";

interface Account {
  id: string;
  accountName: string;
  userName: string;
  status: "active" | "inactive";
}

export default function AccountsPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data
  useEffect(() => {
    const mockAccounts: Account[] = [
      {
        id: "1",
        accountName: "admin@example.com",
        userName: "Nguyễn Văn A",
        status: "active",
      },
      {
        id: "2",
        accountName: "user1@example.com",
        userName: "Trần Thị B",
        status: "active",
      },
      {
        id: "3",
        accountName: "user2@example.com",
        userName: "Lê Văn C",
        status: "inactive",
      },
      {
        id: "4",
        accountName: "user3@example.com",
        userName: "Phạm Thị D",
        status: "active",
      },
      {
        id: "5",
        accountName: "user4@example.com",
        userName: "Hoàng Văn E",
        status: "inactive",
      },
    ];
    setAccounts(mockAccounts);
    setFilteredAccounts(mockAccounts);
  }, []);

  // Filter accounts
  useEffect(() => {
    let result = accounts;

    if (searchTerm) {
      result = result.filter((account) =>
        account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((account) => account.status === statusFilter);
    }

    setFilteredAccounts(result);
    setPage(0);
  }, [accounts, searchTerm, statusFilter]);

  const handleViewDetails = (account: Account) => {
    router.push(`/admin/accounts/${account.id}`);
  };

  const handleChangeStatus = (account: Account) => {
    const newStatus = account.status === "active" ? "inactive" : "active";
    const statusText = newStatus === "active" ? "hoạt động" : "không hoạt động";

    if (confirm(`Bạn có chắc chắn muốn thay đổi trạng thái tài khoản "${account.accountName}" thành ${statusText}?`)) {
      try {
        // await patch(`changeStatus/${account.id}`, { status: newStatus });
        console.log("accountId",account.id);
        console.log("newStatus",newStatus);
        setAccounts(accounts.map((a) =>
          a.id === account.id ? { ...a, status: newStatus } : a
        ));
        alert("Thay đổi trạng thái thành công!");
      } catch (error) {
        console.error("Error:", error);
        alert("Có lỗi xảy ra khi thay đổi trạng thái!");
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4">Quản lý tài khoản</Typography>
      </Stack>

      <Filter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <Table
        accounts={filteredAccounts}
        onViewDetails={handleViewDetails}
        onChangeStatus={handleChangeStatus}
        page={page}
        onPageChange={setPage}
      />
    </Box>
  );
}

