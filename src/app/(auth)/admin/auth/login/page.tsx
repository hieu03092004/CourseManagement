"use client";
import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { post } from "@/app/(admin)/ultils/request";
import { handleResponse } from "@/helpers/api/response/handleResponse";
import { IApiResponse } from "@/helpers/api/response/IResponse";
import { setCookie } from "@/app/(client)/helpers/cookie";
import { getRole } from "@/app/(client)/actions";

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
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const isMobile = mounted ? isMobileQuery : false;

  useEffect(() => {
    setMounted(true);
  }, []);


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
      const requestData = {
        email: formData.email,
        password: formData.password,
      };

      const response = await post("/auth/login", requestData) as IApiResponse<{
        message: string;
        token: string;
        user: {
          id: number;
          email: string;
          fullName: string;
          phone: string;
          roleId: number;
        };
        cartId?: number;
      }>;

      const { isSuccess, data, error } = handleResponse(response);

      if (isSuccess && data) {
        // Kiểm tra roleId
        if (data.user.roleId !== 1 && data.user.roleId !== 2) {
          setError("Vai trò của bạn không hợp lệ");
          setIsLoading(false);
          return;
        }

        // Lưu thông tin user vào cookie
        setCookie("id", String(data.user.id), 1);
        setCookie("fullName", data.user.fullName, 1);
        setCookie("email", data.user.email, 1);
        setCookie("phone", data.user.phone || "", 1);
        setCookie("roleId", String(data.user.roleId), 1);
        setCookie("token", data.token, 1);

        // Dispatch action getRole với roleId từ response
        dispatch(getRole(data.user.roleId));

        // Chuyển hướng về trang dashboard
        router.push("/admin/dashboard");
      } else {
        const errorMessage = error?.message || "Đăng nhập thất bại!";
        setError(errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Có lỗi xảy ra khi đăng nhập!");
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


