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
      title: 'Pagrindinis',
      to: RoutePaths.home,
      onClick: () => {},
    },
    {
      title: 'Prisijungti/Registruotis',
      to: RoutePaths.login,
      onClick: () => {},
    },
    {
      title: 'Topikai',
      to: RoutePaths.topicList,
      onClick: () => {},
    },
  ];
  const authNavigationList = [
    {
      title: 'Pagrindinis',
      to: RoutePaths.home,
      onClick: () => {},
    },
    {
      title: 'Atsijungti',
      onClick: () => {
        dispatch(logoutUser());
        window.localStorage.removeItem('auth');
      },
    },
    {
      title: 'Topikai',
      to: RoutePaths.topicList,
      onClick: () => {},
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
    <header className={styles.navigation}>
      <div className={styles.contentContainer}>
        <ul className={styles.navList}>{navItemList}</ul>
      </div>
    </header>
  );
};
