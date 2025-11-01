"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Paper,
  MenuItem,
  ClickAwayListener,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const ThisAccount: React.FC = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const { logout, account } = useAuth();
  const router = useRouter();

  const handleToggleDropdown = () => setOpen((prev) => !prev);

  const handleCloseDropdown = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current?.contains(event.target as Node)) return;
    setOpen(false);
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") setOpen(false);
  };

  const handleNavigateProfile = () => {
    router.push("/profile");
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/admin/auth/login");
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  const userName = account?.fullName || "";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        ref={anchorRef}
        onClick={handleToggleDropdown}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          p: 1,
          borderRadius: 1,
          bgcolor: "background.paper",
          "&:hover": { bgcolor: "grey.200" },
        }}
      >
        <Avatar
          alt={userName}
          sx={{
            width: 32,
            height: 32,
            mr: 1,
            bgcolor: "#1976d2",
            color: "#fff",
          }}
        >
          {userInitial}
        </Avatar>

        <Typography
          variant="body2"
          sx={{
            mr: 0.5,
            color: "#1976d2",
            display: { xs: "none", sm: "block" },
          }}
        >
          {userName}
        </Typography>

        <KeyboardArrowDownIcon
          fontSize="small"
          sx={{
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            color: "#1976d2",
          }}
        />
      </Box>

      {open && (
        <ClickAwayListener onClickAway={handleCloseDropdown}>
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              right: 0,
              mt: 1,
              width: 220,
              borderRadius: 1,
              zIndex: 1300,
              bgcolor: "background.paper",
            }}
          >
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={userName}
                sx={{
                  width: 64,
                  height: 64,
                  mb: 1,
                  bgcolor: "#1976d2",
                  color: "#fff",
                }}
              >
                {userInitial}
              </Avatar>
              <Typography
                variant="subtitle1"
                fontWeight={500}
                sx={{ color: "#1976d2" }}
              >
                {userName}
              </Typography>
            </Box>

            <MenuItem onClick={handleNavigateProfile} sx={{ py: 1.5 }}>
              <AccountCircleIcon
                sx={{ mr: 2, fontSize: 20, color: "#1976d2" }}
              />
              <Typography variant="body2">Trang cá nhân</Typography>
            </MenuItem>

            <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
              <LogoutIcon sx={{ mr: 2, fontSize: 20, color: "#1976d2" }} />
              <Typography variant="body2">Đăng xuất</Typography>
            </MenuItem>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default ThisAccount;
