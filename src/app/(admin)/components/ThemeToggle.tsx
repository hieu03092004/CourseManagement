import React, { useState } from 'react';
import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'; // System mode icon
import CheckIcon from '@mui/icons-material/Check';
import { useThemeContext } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { mode, isDarkMode, setThemeMode } = useThemeContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModeChange = (newMode: 'light' | 'dark' | 'system') => {
        setThemeMode(newMode);
        handleClose();
    };

    return (
        <>
            <Tooltip title="Tùy chọn theme">
                <IconButton
                    onClick={handleClick}
                    color="inherit"
                    aria-label="theme options"
                    aria-controls={open ? "theme-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    sx={{
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.1)'
                        }
                    }}
                >
                    {mode === 'system' ? (
                        <SettingsBrightnessIcon />
                    ) : isDarkMode ? (
                        <Brightness7Icon />
                    ) : (
                        <Brightness4Icon />
                    )}
                </IconButton>
            </Tooltip>

            <Menu
                id="theme-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'theme-button',
                }}
            >
                <MenuItem onClick={() => handleModeChange('light')}>
                    <ListItemIcon>
                        <Brightness7Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sáng</ListItemText>
                    {mode === 'light' && <CheckIcon fontSize="small" color="primary" />}
                </MenuItem>

                <MenuItem onClick={() => handleModeChange('dark')}>
                    <ListItemIcon>
                        <Brightness4Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Tối</ListItemText>
                    {mode === 'dark' && <CheckIcon fontSize="small" color="primary" />}
                </MenuItem>

                <MenuItem onClick={() => handleModeChange('system')}>
                    <ListItemIcon>
                        <SettingsBrightnessIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Theo hệ thống</ListItemText>
                    {mode === 'system' && <CheckIcon fontSize="small" color="primary" />}
                </MenuItem>
            </Menu>
        </>
    );
};

export default ThemeToggle;