import { createTheme, PaletteMode } from '@mui/material/styles';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

const createAppTheme = (mode: PaletteMode) => {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: COLORS.PRIMARY,
            },
            secondary: {
                main: COLORS.SECONDARY,
            },
            background: {
                default: mode === 'light' ? COLORS.LIGHT_BACKGROUND : COLORS.DARK_BACKGROUND,
                paper: mode === 'light' ? COLORS.LIGHT_PAPER : COLORS.DARK_PAPER,
            },
        },
        typography: {
            fontFamily: TYPOGRAPHY.FONT_FAMILY,
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                    size: 'medium',
                },
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: SPACING.BUTTON_PADDING,
                        fontSize: TYPOGRAPHY.BUTTON_FONT_SIZE,
                    },
                    sizeLarge: {
                        padding: SPACING.BUTTON_LARGE_PADDING,
                        fontSize: TYPOGRAPHY.BUTTON_LARGE_FONT_SIZE,
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    variant: 'outlined',
                    size: 'medium',
                },
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            height: SPACING.INPUT_HEIGHT,
                        },
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        fontSize: TYPOGRAPHY.INPUT_FONT_SIZE,
                        '& .MuiOutlinedInput-input': {
                            padding: SPACING.INPUT_PADDING,
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontSize: TYPOGRAPHY.INPUT_FONT_SIZE,
                        transform: 'translate(16px, 16px) scale(1)',
                        '&.MuiInputLabel-shrink': {
                            transform: 'translate(16px, -9px) scale(0.75)',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    outlined: {
                        height: SPACING.INPUT_HEIGHT,
                        display: 'flex',
                        alignItems: 'center',
                        paddingTop: '0px !important',
                        paddingBottom: '0px !important',
                    },
                    select: {
                        paddingTop: SPACING.INPUT_PADDING,
                        paddingBottom: SPACING.INPUT_PADDING,
                    },
                    icon: {
                        top: 'calc(50% - 12px)',
                    },
                },
            },
        },
    });
};

// Default theme
const theme = createAppTheme('light');

export { createAppTheme };
export default theme;