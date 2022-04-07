import React, { useEffect } from 'react';
import styles from './app.module.css';
import { authenticateUser, setUser } from '../user';
import { useAppDispatch, useAppSelector } from '../store';
import { Router } from '../router';
import { Navigation } from '../navigation';

export function App() {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user && window.localStorage.getItem('auth')) {
      dispatch(setUser({ _id: 'test', email: 'test' }));
    }
  }, [dispatch, user]);

  return (
    <div>
      <Navigation />
      <main className={styles.content}>
        <Router />
      </main>
    </div>
  );
}
