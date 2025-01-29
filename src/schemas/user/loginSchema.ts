import * as yup from 'yup';
import { emailValidation } from '../common/emailRules';

export const loginSchema = yup.object().shape({
    email: emailValidation,
    password: yup.string().required('Password is required'),
});
