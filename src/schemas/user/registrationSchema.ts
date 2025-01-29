import * as yup from 'yup';
import { emailValidation } from '../common/emailRules';
import { passwordValidation } from '../common/passwordRules';

export const registrationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: yup
        .string()
        .nullable() // Allows null as a valid value
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});
