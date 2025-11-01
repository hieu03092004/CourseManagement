import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from '../components/ThemeToggle';
import ThisAccount from '../components/ThisAccount';

interface NavbarProps {
    handleDrawerToggle: () => void;
}

const Navbar = ({ handleDrawerToggle }:NavbarProps) => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Left side: Logo with Menu icon */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Nút toggle sidebar */}
                    <IconButton
                        color="inherit"
                        aria-label="toggle sidebar"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: '0.5px' }}>
                        Course Management System
                    </Typography>
                </Box>

                {/* Right side: Theme Toggle and User Account */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Theme Toggle Button - không cần truyền props vì component đã sử dụng context */}
                    <ThemeToggle />

                    {/* ThisAccount component - Dropdown với avatar và thông tin người dùng */}
                    <Box sx={{ ml: 2 }}>
                        <ThisAccount />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;