import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
    label: string;
    loading?: boolean; // Custom loading state
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    variant = 'contained',
    color = 'primary',
    disabled = false,
    loading = false,
    type = 'button',
    sx,
    ...rest
}) => {
    return (
        <Button
            variant={variant}
            color={color}
            onClick={onClick}
            disabled={disabled || loading}
            type={type as 'button' | 'submit' | 'reset'} // Restrict type
            sx={{
                minWidth: 120,
                margin: '8px 0',
                ...sx, // Allow custom styles via sx prop
            }}
            aria-busy={loading} // Accessibility for loading state
            {...rest} // Spread other props like className, id, etc.
        >
            {loading ? <CircularProgress size={24} color="inherit" /> : label}
        </Button>
    );
};

export default CustomButton;
