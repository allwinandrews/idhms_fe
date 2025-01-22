import React from 'react';
import { useForm, FormProvider, Resolver, FieldValues, DefaultValues, RegisterOptions } from 'react-hook-form';
import { ButtonProps, SelectProps, TextFieldProps } from '@mui/material';
import CustomButton from './CustomButton';
import Dropdown from './Dropdown';
import TextField from './TextField';

export type FieldType = 'text' | 'dropdown' | 'button' | 'checkbox' | 'radio' | 'date';

export interface FieldConfig {
    type: FieldType; // Extendable type for various input fields
    name: string; // Field name
    label?: string; // Optional label for the field
    options?: { value: string | number; label: string }[]; // Dropdown or radio button options
    validation?: RegisterOptions; // Validation rules for forms
    muiProps?: Partial<
        FieldConfigProps // Conditional props based on type
    >;
    action?: () => void; // Button-specific actions
}

type FieldConfigProps = TextFieldProps | SelectProps | ButtonProps;

interface FormProps<T extends FieldValues> {
    defaultValues: DefaultValues<T>; // Default values for the form
    validationSchema: Resolver<T>; // Validation resolver
    onSubmit: (data: T) => void; // Form submission handler
    fields: FieldConfig[]; // Field configurations
}

const Form = <T extends FieldValues>({
    defaultValues,
    validationSchema,
    onSubmit,
    fields,
}: React.PropsWithChildren<FormProps<T>>) => {
    const methods = useForm<T>({
        defaultValues,
        resolver: validationSchema,
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {fields.map((field) => {
                    switch (field.type) {
                        case 'text':
                            return (
                                <TextField
                                    key={field.name}
                                    name={field.name}
                                    label={field.label || ''}
                                    validation={field.validation}
                                    muiProps={field.muiProps as TextFieldProps}
                                />
                            );
                        case 'dropdown':
                            return (
                                <Dropdown
                                    key={field.name}
                                    name={field.name}
                                    label={field.label || ''}
                                    options={field.options || []}
                                    validation={field.validation}
                                    muiProps={field.muiProps as SelectProps}
                                />
                            );
                        case 'button':
                            return (
                                <CustomButton
                                    key={field.name}
                                    label={field.label || ''}
                                    onClick={field.action || (() => { })}
                                    variant={
                                        (field.muiProps?.variant as 'text' | 'outlined' | 'contained') || 'contained'
                                    } // Ensure the type matches the expected variant
                                    color={
                                        (field.muiProps?.color as 'primary' | 'secondary' | 'error' | 'success') || 'primary'
                                    } // Restrict color to allowed values
                                    type={
                                        (field.muiProps?.type as 'button' | 'submit' | 'reset') || 'button'
                                    } // Ensure the type matches the allowed HTML button types
                                />

                            );
                        default:
                            return null;
                    }
                })}
                <CustomButton label="Submit" type="submit" />
            </form>
        </FormProvider>
    );
};

export default Form;
