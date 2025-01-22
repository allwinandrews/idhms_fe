import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { Controller, useFormContext, RegisterOptions } from 'react-hook-form';

interface TextFieldProps {
    name: string;
    label: string;
    validation?: RegisterOptions;
    muiProps?: MuiTextFieldProps;
}

const TextField: React.FC<TextFieldProps> = ({ name, label, validation, muiProps }) => {
    const { control } = useFormContext() || {};

    if (!control) {
        console.warn(`TextField component must be used within a FormProvider.`);
        return null; // Prevent rendering if not within FormProvider
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={validation}
            render={({ field, fieldState }) => (
                <MuiTextField
                    {...field}
                    label={label}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{ marginBottom: 2 }}
                    {...muiProps}
                />
            )}
        />
    );
};


export default TextField;
