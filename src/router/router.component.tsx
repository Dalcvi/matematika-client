import { Route, Routes } from 'react-router-dom';
import { Login, Register } from '../login-system';
import { RoutePaths } from './';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<div>Hello world!</div>} />
      <Route path={RoutePaths.login} element={<Login />} />
      <Route path={RoutePaths.register} element={<Register />} />
    </Routes>
  );
};
