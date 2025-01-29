import * as yup from 'yup';

export const dateValidation = yup
    .date()
    .required('Date is required')
    .min(new Date(), 'Date cannot be in the past');
