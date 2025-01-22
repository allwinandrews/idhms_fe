import React from 'react';
import {
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SelectProps,
    FormHelperText,
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
    const formContext = useFormContext();
    const control = formContext?.control;

    // Non-FormProvider mode
    if (nonForm || !control) {
        return (
            <FormControl
                fullWidth
                sx={{ marginBottom: 2 }}
            >
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value || ''}
                    onChange={(e) => onChange?.(e.target.value as string | number)}
                    {...muiProps}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
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
                    sx={{ marginBottom: 2 }}
                >
                    <InputLabel>{label}</InputLabel>
                    <Select
                        {...field}
                        {...muiProps}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
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
