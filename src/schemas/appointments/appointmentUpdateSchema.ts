import * as yup from 'yup';
import { dateValidation } from '../common/dateRules';

export const appointmentUpdateSchema = yup.object().shape({
    appointmentId: yup.string().required('Appointment ID is required'),
    date: dateValidation,
    time: yup.string().required('Time is required'),
    status: yup
        .string()
        .oneOf(['Scheduled', 'Completed', 'Cancelled'], 'Invalid status')
        .required('Status is required'),
});