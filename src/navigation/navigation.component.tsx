import { Container, Paper } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { RoutePaths } from '../router';
import { useAppDispatch, useAppSelector } from '../store';
import { logoutUser } from '../user';
import { NavItem } from './nav-item';
import styles from './navigation.module.css';

export const Navigation = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const guestNavigationList = [
    {
      title: 'Temos',
      to: RoutePaths.topicList,
      onClick: () => {},
    },
    {
      title: 'Prisijungti/Registruotis',
      to: RoutePaths.login,
      onClick: () => {},
    },
  ];
  const authNavigationList = [
    {
      title: 'Temos',
      to: RoutePaths.topicList,
      onClick: () => {},
    },
    {
      title: 'Atsijungti',
      onClick: () => {
        dispatch(logoutUser());
        window.localStorage.removeItem('auth');
      },
    },
  ];
  const list = user ? authNavigationList : guestNavigationList;
  const navItemList = list.map(item => {
    return (
      <NavItem
        title={item.title}
        onClick={item.onClick}
        to={item.to}
        isActive={item.to === location.pathname}
      />
    );
  });

  return (
    <Paper elevation={6} square={true}>
      <header className={styles.navigation}>
        <Container className={styles.contentContainer}>
          <ul className={styles.navList}>{navItemList}</ul>
        </Container>
      </header>
    </Paper>
  );
};
