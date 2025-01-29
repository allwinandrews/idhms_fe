import * as yup from 'yup';

export const roleManagementSchema = yup.object().shape({
    userId: yup.string().required('User ID is required'),
    role: yup
        .string()
        .oneOf(['Admin', 'Dentist', 'Receptionist', 'Patient'], 'Invalid role')
        .required('Role is required'),
});
