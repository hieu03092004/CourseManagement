"use client";
import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './context/AuthContext';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const theme = useTheme();
    // Check if the device is mobile (avoid SSR mismatch)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

    // State để theo dõi trạng thái mở/đóng của sidebar
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Update sidebar state when screen size changes
    useEffect(() => {
        setSidebarOpen(!isMobile);
    }, [isMobile]);

    // Hàm xử lý sự kiện toggle sidebar
    const handleDrawerToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <AuthProvider>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                {/* Navbar ở trên cùng */}
                <Navbar handleDrawerToggle={handleDrawerToggle} />

                {/* Sidebar có thể ẩn/hiện */}
                <Sidebar
                    open={sidebarOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    // Pass isMobile prop to Sidebar để xử lý khác nhau
                    isMobile={isMobile}
                />

                {/* Main content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: '100%',
                        // Chỉ áp dụng margin transition cho desktop, không cho mobile
                        ...(isMobile ? {} : {
                            transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
                        })
                    }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </AuthProvider>
    );
};

export default MainLayout;