import { Box } from '@mui/material';
import styles from './login-system-container.module.css';

export const LoginSystemContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Box className={styles.container}>{children}</Box>;
};
