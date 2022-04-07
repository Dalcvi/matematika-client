import { Link } from 'react-router-dom';
import { NavItemProps } from './nav-item.interfaces';
import styles from './nav-item.module.css';

export const NavItem = ({ title, to, onClick, isActive }: NavItemProps) => {
  const classNames = `${styles.navItem} ${isActive ? styles.selectedItem : ''}`;
  const wrapperClassNames = `${styles.wrapper} ${
    isActive ? styles.selectedWrapper : ''
  }`;
  const titleComp = to ? (
    <Link to={to} className={classNames}>
      {title}
    </Link>
  ) : (
    <div onClick={onClick} className={classNames}>
      {title}
    </div>
  );

  return <li className={wrapperClassNames}>{titleComp}</li>;
};
