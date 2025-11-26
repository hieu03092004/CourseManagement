"use client";
import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    AppRegistration,
    Apps,
    Construction,
    Home,
    MeetingRoom,
    Person
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    open: boolean;
    handleDrawerToggle: () => void;
    isMobile?: boolean;
}

interface MenuItem {
    path: string;
    label: string;
    icon: React.ReactNode;
}

const drawerWidth = 300;

const Sidebar: React.FC<SidebarProps> = ({ open, handleDrawerToggle, isMobile: propIsMobile }) => {
    const theme = useTheme();
    const pathname = usePathname();

    const isMobileDetected = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
    const isMobile = propIsMobile !== undefined ? propIsMobile : isMobileDetected;

    // Danh sách menu
    const menuItems: MenuItem[] = [
        { path: '/', label: 'Trang chủ', icon: <Home /> },
        { path: '/admin/orders', label: 'Đơn hàng', icon: <MeetingRoom /> },
        { path: '/admin/quizzles', label: 'Quizzles', icon: <Construction /> },
        { path: '/admin/accounts', label: 'Tài khoản', icon: <Person /> },
        { path: '/admin/course-video', label: 'Khoá học online', icon: <AppRegistration /> },
        { path: '/course-zoom', label: 'Khoá học zoom', icon: <Apps /> },
    ];

    // Style cho item đang được chọn
    const selectedItemStyle = {
        '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '& .MuiListItemText-primary': {
                fontWeight: 'bold'
            }
        }
    };

    const drawerContent = (
        <>
            <Toolbar />
            <List sx={{ paddingTop: 3 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={Link}
                            href={item.path}
                            selected={pathname === item.path}
                            sx={selectedItemStyle}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: { xs: '0', md: open ? drawerWidth : 0 },
                flexShrink: 0
            }}
        >
            <Drawer
                variant={isMobile ? "temporary" : "persistent"}
                open={open}
                onClose={isMobile ? handleDrawerToggle : undefined}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        ...(isMobile ? {
                            zIndex: (theme) => theme.zIndex.drawer + 2
                        } : {})
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;