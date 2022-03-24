import { FormGroup, Paper, Typography } from '@mui/material';
import React from 'react';
import styles from './login-system-form.module.css';

interface LoginSystemFormProps {
  mainText: string;
  children: React.ReactNode;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

export const LoginSystemForm = ({
  mainText,
  children,
  onSubmit,
}: LoginSystemFormProps) => {
  return (
    <Paper elevation={4} className={styles.contentContainer}>
      <Typography variant="h2">{mainText}</Typography>
      <FormGroup row={false} className={styles.form}>
        <form onSubmit={onSubmit}>{children}</form>
      </FormGroup>
    </Paper>
  );
};
