import * as yup from 'yup';
import { dateValidation } from '../common/dateRules';

export const appointmentCreateSchema = yup.object().shape({
    patientId: yup.string().required('patient ID is required'),
    date: dateValidation,
    time: yup.string().required('Time is required'),
    notes: yup.string().max(500, 'Notes cannot exceed 500 characters'),
});
