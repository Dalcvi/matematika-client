import React, { useEffect } from 'react';
import styles from './app.module.css';
import { authenticateUser, setUser } from '../user';
import { useAppDispatch, useAppSelector } from '../store';
import { Router } from '../router';
import { Navigation } from '../navigation';
import { Loader } from '../loader';

export function App() {
  const user = useAppSelector(state => state.user);
  const isUserLoading = useAppSelector(state => state.loading['user']);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user && window.localStorage.getItem('auth')) {
      dispatch(authenticateUser());
    }
  }, [dispatch, user]);

  if (isUserLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Navigation />
      <main className={styles.content}>
        <Router />
      </main>
    </div>
  );
}
