import {
  Box,
  Button,
  debounce,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  textFieldProps,
  settingEmailErrors,
  settingPassErrors,
  isFormCorrect,
  LoginSystemForm,
} from '../';
import styles from './login.module.css';
import React from 'react';
import { useLogin, LOGIN_LOADING_STATE_ID } from '.';
import { LoginSystemContainer } from '../login-system-container';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../store';

export const Login = () => {
  const navigateTo = useNavigate();
  const { login } = useLogin();
  const user = useAppSelector(state => state.user);
  const isLoading = useAppSelector(
    state => state.loading[LOGIN_LOADING_STATE_ID],
  );

  useEffect(() => {
    if (user) {
      navigateTo('/');
    }
  }, [navigateTo, user]);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [passErrors, setPassErrors] = useState<string[]>([]);
  const [showPass, setShowPass] = useState<boolean>(false);

  const debouncedSetEmailError = useMemo(
    () => debounce(settingEmailErrors(setEmailError), 2000),
    [],
  );
  const debouncedSetPassError = useMemo(
    () => debounce(settingPassErrors(setPassErrors), 2000),
    [],
  );

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = [email, pass];
    const errors = [emailError, ...passErrors];
    if (isFormCorrect(formValues, errors)) {
      login({ email, password: pass });
    }
  };

  return (
    <LoginSystemContainer>
      <LoginSystemForm mainText="Login" onSubmit={onSubmit}>
        <TextField
          {...textFieldProps.email}
          error={emailError.length !== 0}
          helperText={emailError}
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            debouncedSetEmailError(e.target.value);
          }}
          onBlur={e => {
            debouncedSetEmailError.clear();
            settingEmailErrors(setEmailError)(e.target.value);
          }}
        />
        <TextField
          {...textFieldProps.pass}
          helperText={combineErrorMessages(passErrors)}
          type={showPass ? 'text' : 'password'}
          error={passErrors.length !== 0}
          value={pass}
          onChange={e => {
            setPass(e.target.value);
            debouncedSetPassError(e.target.value);
          }}
          onBlur={e => {
            debouncedSetPassError.clear();
            if (e.target.value.length === 0) {
              setPassErrors([]);
              return;
            }
            settingPassErrors(setPassErrors)(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPass(!showPass)}
                onMouseDown={() => setShowPass(!showPass)}
                edge="end"
              >
                {showPass ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <Divider className={styles.divider} />
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          className={styles.formButton}
        >
          Login
        </LoadingButton>
        <Button
          type="submit"
          variant="outlined"
          className={styles.formButton}
          onClick={() => navigateTo('/register')}
        >
          Register
        </Button>
      </LoginSystemForm>
    </LoginSystemContainer>
  );
};

const combineErrorMessages = (errors: string[]) =>
  errors.map(error => (
    <React.Fragment key={error}>
      {error}
      <br />
    </React.Fragment>
  ));
