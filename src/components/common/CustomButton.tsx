import React from 'react';
import { Button, CircularProgress, ButtonProps, useTheme } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
    label: string;
    loading?: boolean | null | undefined; // Optional loading state, ensure it’s boolean, null or undefined
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    variant = 'contained',
    color = 'primary',
    disabled = false,
    loading = false, // Default loading to false if not provided
    type = 'button',
    sx,
    ...rest
}) => {
    const isLoading = !!loading; // Forcefully convert to boolean

    const theme = useTheme(); // Access the theme for spacing, colors, etc.

    return (
        <Button
            variant={variant}
            color={color}
            onClick={onClick}
            disabled={disabled || isLoading}
            type={type as 'button' | 'submit' | 'reset'} // Restrict type
            sx={{
                minWidth: theme.spacing(15), // Use theme spacing for width
                margin: theme.spacing(1, 0), // Use theme spacing for margin
                fontSize: theme.typography.body1.fontSize, // Use typography from design tokens
                fontWeight: theme.typography.body1.fontWeight, // Use typography weight
                textTransform: 'none', // Disable uppercase transformation
                ...sx, // Allow custom styles via sx prop
            }}
            aria-busy={isLoading} // Accessibility for loading state
            {...rest} // Spread other props like className, id, etc.
        >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : label}
        </Button>
    );
};

export default CustomButton;
