import * as yup from 'yup';

export const roleManagementSchema = yup.object().shape({
    userId: yup.string().required('User ID is required'),
    role: yup
        .string()
        .oneOf(['admin', 'dentist', 'receptionist', 'patient'], 'Invalid role')
        .required('Role is required'),
});
