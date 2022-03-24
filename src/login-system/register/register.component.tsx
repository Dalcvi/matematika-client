import {
  debounce,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import {
  settingEmailErrors,
  settingPassErrors,
  textFieldProps,
  isFormCorrect,
  LoginSystemForm,
} from '../';
import { useAppSelector } from '../../store';
import { REGISTER_LOADING_STATE_ID, useRegistration } from '.';
import { LoginSystemContainer } from '../login-system-container';
import { settingUsernameErrors } from '../login-system.utils';

export const Register = () => {
  const { registerAccount } = useRegistration();
  const isLoading = useAppSelector(
    state => state.loading[REGISTER_LOADING_STATE_ID],
  );
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [usernameErrors, setUsernameError] = useState<string[]>([]);
  const [passErrors, setPassErrors] = useState<string[]>([]);
  const [showPass, setShowPass] = useState<boolean>(false);

  const debouncedSetEmailError = useMemo(
    () => debounce(settingEmailErrors(setEmailError), 2000),
    [],
  );
  const debouncedSetUsernameErrors = useMemo(
    () => debounce(settingUsernameErrors(setUsernameError), 2000),
    [],
  );
  const debouncedSetPassErrors = useMemo(
    () => debounce(settingPassErrors(setPassErrors), 2000),
    [],
  );

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = [email, pass, username];
    const formErrors = [emailError, ...passErrors, ...usernameErrors];
    if (isFormCorrect(formValues, formErrors)) {
      registerAccount({ username, email, password: pass });
    }
  };

  return (
    <LoginSystemContainer>
      <LoginSystemForm mainText="Register" onSubmit={onSubmit}>
        <TextField
          {...textFieldProps.username}
          error={usernameErrors.length !== 0}
          helperText={combineErrorMessages(usernameErrors)}
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            debouncedSetUsernameErrors(e.target.value);
          }}
          onBlur={e => {
            debouncedSetUsernameErrors.clear();
            settingUsernameErrors(setUsernameError)(e.target.value);
          }}
        />
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
            debouncedSetPassErrors(e.target.value);
          }}
          onBlur={e => {
            debouncedSetPassErrors.clear();
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
          variant="contained"
          className={styles.formButton}
          type="submit"
        >
          Register
        </LoadingButton>
        <div className={styles.bottom}>
          <Typography variant="body1" className={styles.bottomText}>
            Have an account already?{' '}
          </Typography>
          <Link to="/login" className={styles.bottomTextLink}>
            Sign In
          </Link>
        </div>
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
