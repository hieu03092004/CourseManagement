import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '../ultils/theme'; // Import hàm tạo theme

// Các tùy chọn theme
type ThemeMode = 'light' | 'dark' | 'system';

// Định nghĩa kiểu dữ liệu cho context
type ThemeContextType = {
  mode: ThemeMode;
  isDarkMode: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

// Tạo context với giá trị mặc định
const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  isDarkMode: false,
  setThemeMode: () => {},
  toggleTheme: () => {},
});

// Custom hook để sử dụng context
export const useThemeContext = () => useContext(ThemeContext);

// Props cho ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme Provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Lấy theme từ localStorage hoặc dùng theme mặc định (system)
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')
        ? savedMode as ThemeMode
        : 'system';
  });

  // State theo dõi theme thực tế đang áp dụng (dark hay light)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Function để đặt theme mode
  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  // Function để toggle theme giữa light và dark (khi không phải mode system)
  const toggleTheme = () => {
    if (mode === 'system') {
      // Nếu đang ở chế độ system, chuyển sang light hoặc dark tùy thuộc vào theme hiện tại
      setMode(isDarkMode ? 'light' : 'dark');
    } else {
      // Nếu đang ở light hoặc dark, chuyển đổi giữa chúng
      setMode(mode === 'light' ? 'dark' : 'light');
    }
  };

  // Xác định theme thực tế dựa trên mode và theme hệ thống
  useEffect(() => {
    const determineTheme = () => {
      if (mode === 'system') {
        // Kiểm tra theme hệ thống
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemPrefersDark);
      } else {
        setIsDarkMode(mode === 'dark');
      }
    };

    determineTheme();

    // Theo dõi thay đổi theme hệ thống
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (mode === 'system') {
        setIsDarkMode(mediaQuery.matches);
      }
    };

    // Đăng ký listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Hỗ trợ cho các trình duyệt cũ
      mediaQuery.addListener(handleChange);
    }

    // Lưu theme vào localStorage khi thay đổi
    localStorage.setItem('theme-mode', mode);

    // Cleanup listener
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Hỗ trợ cho các trình duyệt cũ
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [mode]);

  // Tạo theme dựa trên mode
  const theme = createAppTheme(isDarkMode ? 'dark' : 'light');

  return (
      <ThemeContext.Provider value={{ mode, isDarkMode, setThemeMode, toggleTheme }}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline /> {/* Reset CSS và áp dụng styles theo theme */}
          {children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
  );
};