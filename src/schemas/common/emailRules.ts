import * as yup from 'yup';

export const emailValidation = yup
    .string()
    .email('Enter a valid email address')
    .required('Email is required');
