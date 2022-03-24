import { Link, useLocation } from 'react-router-dom';
import { RoutePaths } from '../router';
import { NavItem } from './nav-item';
import styles from './navigation.module.css';

export const Navigation = () => {
  const location = useLocation();
  const navigationList = [
    {
      title: 'Home',
      to: RoutePaths.home,
    },
    {
      title: 'Login/Register',
      to: RoutePaths.login,
    },
  ];

  const navItemList = navigationList.map(item => {
    return (
      <NavItem
        title={item.title}
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
