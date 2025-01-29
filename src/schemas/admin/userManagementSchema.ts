import * as yup from 'yup';
import { emailValidation } from '../common/emailRules';

export const userManagementSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: emailValidation,
    role: yup
        .string()
        .oneOf(['Admin', 'Dentist', 'Receptionist', 'Patient'], 'Invalid role')
        .required('Role is required'),
});
