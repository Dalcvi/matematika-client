import { OutlinedTextFieldProps } from '@mui/material';
import styles from './login-system.module.css';

export const textFieldProps: { [key: string]: OutlinedTextFieldProps } = {
  username: {
    id: 'username',
    label: 'Vartotojo vardas',
    type: 'username',
    variant: 'outlined',
    autoComplete: 'username',
    size: 'small',
    required: true,
    className: styles.formInput,
  },
  email: {
    id: 'email',
    label: 'El. paštas',
    type: 'email',
    variant: 'outlined',
    autoComplete: 'email',
    size: 'small',
    required: true,
    className: styles.formInput,
  },
  pass: {
    id: 'password',
    label: 'Slaptažodis',
    variant: 'outlined',
    size: 'small',
    autoComplete: 'new-password',
    required: true,
    className: styles.formInput,
  },
};

export enum InputErrorMessages {
  INVALID_EMAIL = 'Netinkamas el. paštas',
  PASSWORD_ONE_UPPERCASE = 'Slaptažodis turi turėti bent vieną didžiąjį raidę',
  PASSWORD_ONE_NUMBER = 'Slaptažodis turi turėti bent vieną skaičių',
  MIN_LENGTH = 'Slaptažodis turi turėti mažiausiai {minLength} simbolių',
  INVALID_USERNAME = 'Netinkamas vartotojo vardas',
}

export const MIN_PASSWORD_LENGTH = 6;
export const MIN_USERNAME_LENGTH = 3;
