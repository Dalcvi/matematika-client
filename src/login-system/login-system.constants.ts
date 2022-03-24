import { OutlinedTextFieldProps } from '@mui/material';
import styles from './login-system.module.css';

export const textFieldProps: { [key: string]: OutlinedTextFieldProps } = {
  username: {
    id: 'username',
    label: 'Username',
    type: 'username',
    variant: 'outlined',
    autoComplete: 'username',
    size: 'small',
    required: true,
    className: styles.formInput,
  },
  email: {
    id: 'email',
    label: 'Email',
    type: 'email',
    variant: 'outlined',
    autoComplete: 'email',
    size: 'small',
    required: true,
    className: styles.formInput,
  },
  pass: {
    id: 'password',
    label: 'Password',
    variant: 'outlined',
    size: 'small',
    autoComplete: 'new-password',
    required: true,
    className: styles.formInput,
  },
};

export enum InputErrorMessages {
  INVALID_EMAIL = 'Email is invalid',
  EMAIL_DOESNT_MATCH = "Email doesn't match",
  PASSWORD_ONE_UPPERCASE = 'Should contain at least 1 upper case letter',
  PASSWORD_ONE_NUMBER = 'Should contain at least 1 number',
  MIN_LENGTH = 'Should contain at least {minLength} characters',
  PASSWORD_DOESNT_MATCH = "Password doesn't match",
  INVALID_USERNAME = 'Username is invalid',
}

export const MIN_PASSWORD_LENGTH = 6;
export const MIN_USERNAME_LENGTH = 3;
