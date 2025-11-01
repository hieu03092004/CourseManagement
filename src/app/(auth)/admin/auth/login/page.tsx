"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Snackbar,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";

// Constants
const LOGO_SIZE = 100;
const CARD_WIDTH = 500;
const MOBILE_CARD_WIDTH = "90%";

interface LoginFormData {
  email: string;
  password: string;
}

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError("Vui lòng nhập email");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Vui lòng nhập mật khẩu");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Temporary login success - navigate to dashboard
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      // Mock successful login
      router.push('/admin/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Có lỗi xảy ra, vui lòng thử lại");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderLeftColumn = () => (
    <Box
      width={isMobile ? "100%" : "50%"}
      display="flex"
      flexDirection="column"
      p={isMobile ? 4 : 14}
    >
      <img
        className="object-cover rounded-full"
        src="/src/assets/images/avatar_demo.png"
        alt="Logo"
        style={{ width: LOGO_SIZE, marginBottom: 20 }}
      />
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Course Management
      </Typography>
      <Typography variant="h6">Đăng nhập hệ thống</Typography>
    </Box>
  );

  const renderLoginForm = () => (
    <Card
      sx={{
        width: isMobile ? MOBILE_CARD_WIDTH : CARD_WIDTH,
        p: isMobile ? 1 : 3,
        boxShadow: 5,
      }}
    >
      <CardContent>
        <Typography variant="h5" mb={2}>
          Đăng nhập
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            name="password"
            type="password"
            label="Mật khẩu"
            margin="normal"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, p: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      height="100vh"
      width="100%"
    >
      {renderLeftColumn()}
      <Box
        width={isMobile ? "100%" : "50%"}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {renderLoginForm()}
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
        message={error}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Box>
  );
};

export default Login;


