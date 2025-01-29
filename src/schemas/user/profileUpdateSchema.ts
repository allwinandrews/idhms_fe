import * as yup from 'yup';
import { emailValidation } from '../common/emailRules';

export const profileUpdateSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: emailValidation,
    phone: yup
        .string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
});
