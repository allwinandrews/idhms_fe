import React from 'react';
import {
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SelectProps,
    FormHelperText,
    useTheme,
} from '@mui/material';
import { Controller, useFormContext, RegisterOptions } from 'react-hook-form';

interface DropdownProps extends Omit<SelectProps, 'onChange'> {
    name: string; // Field name
    label: string; // Field label
    options: { value: string | number; label: string }[]; // Dropdown options
    validation?: RegisterOptions; // Validation rules for react-hook-form
    muiProps?: Partial<SelectProps>; // Additional Material-UI props
    nonForm?: boolean; // Indicates if the component should work outside of FormProvider
    value?: string | number; // Selected value for non-form usage
    onChange?: (value: string | number) => void; // Change handler for non-form usage
}

const Dropdown: React.FC<DropdownProps> = ({
    name,
    label,
    options,
    validation,
    muiProps,
    nonForm = false,
    value,
    onChange,
}) => {
    const theme = useTheme(); // Access design tokens
    const formContext = useFormContext();
    const control = formContext?.control;

    // Non-FormProvider mode
    if (nonForm || !control) {
        return (
            <FormControl
                fullWidth
                sx={{
                    marginBottom: theme.spacing(2),
                }}
            >
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value || ''}
                    onChange={(e) => onChange?.(e.target.value as string | number)}
                    {...muiProps}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.secondary.main,
                        },
                    }}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light,
                                    color: theme.palette.common.white,
                                },
                            }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    // FormProvider mode
    return (
        <Controller
            name={name}
            control={control}
            rules={validation}
            render={({ field, fieldState }) => (
                <FormControl
                    fullWidth
                    error={!!fieldState.error}
                    sx={{
                        marginBottom: theme.spacing(2),
                    }}
                >
                    <InputLabel>{label}</InputLabel>
                    <Select
                        {...field}
                        {...muiProps}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.secondary.main,
                            },
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.light,
                                        color: theme.palette.common.white,
                                    },
                                }}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default Dropdown;
