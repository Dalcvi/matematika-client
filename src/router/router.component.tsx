import { Route, Routes } from 'react-router-dom';
import { Login, Register } from '../login-system';
import { RoutePaths } from './';

export const Router = () => {
  return (
    <Routes>
      <Route path={RoutePaths.login} element={<Login />} />
      <Route path={RoutePaths.register} element={<Register />} />
    </Routes>
  );
};
