import React from 'react';
import {
  useForm,
  FormProvider,
  FieldValues,
  DefaultValues,
  Resolver,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import {
  ButtonProps,
  SelectProps,
  TextFieldProps,
  useTheme,
  Box,
  CircularProgress,
} from '@mui/material';

import CustomButton from './CustomButton';
import Dropdown from './Dropdown';
import TextField from './TextField';
import { FieldConfig } from '../../assets/types';

interface FormProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>;
  validationSchema: ObjectSchema<Partial<T>>; // Correctly aligned with Yup
  onSubmit: (data: T) => void; // Form submission handler
  fields: FieldConfig[]; // Form field configurations
  loading?: boolean | null | undefined; // Optional loading state, ensure it’s boolean, null or undefined
}

const Form = <T extends FieldValues>({
  defaultValues,
  validationSchema,
  onSubmit,
  fields,
  loading = false,
}: React.PropsWithChildren<FormProps<T>>) => {
  const theme = useTheme();
  // Properly align useForm with Partial<T> and yupResolver
  const methods = useForm<Partial<T>>({
    defaultValues: defaultValues as DefaultValues<Partial<T>>, // Cast defaultValues to Partial<T> for compatibility
    resolver: yupResolver(validationSchema) as unknown as Resolver<Partial<T>>, // Explicit cast through unknown to avoid type conflict
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => onSubmit(data as T))}
        style={{ width: '100%' }}
      >
        <fieldset disabled={!!loading} style={{ border: 'none', padding: 0 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(2),
            }}
          >
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
                      onClick={field.action}
                      loading={loading ?? false} // Explicitly ensure boolean
                      {...(field.muiProps as ButtonProps)}
                    />
                  );
                default:
                  return null;
              }
            })}
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  display: 'block',
                  margin: '16px auto',
                }}
              />
            ) : (
              <CustomButton label="Submit" type="submit" loading={loading} />
            )}
          </Box>
        </fieldset>
      </form>
    </FormProvider>
  );
};

export default Form;
