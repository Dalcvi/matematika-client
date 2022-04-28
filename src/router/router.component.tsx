import { Route, Routes } from 'react-router-dom';
import { Login, Register } from '../login-system';
import { TopicList } from '../topic-list-page';
import { Topic } from '../topic-view-page';
import { RoutePaths } from './';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<div>Hello world!</div>} />
      <Route path={RoutePaths.login} element={<Login />} />
      <Route path={RoutePaths.register} element={<Register />} />
      <Route path={RoutePaths.topicList} element={<TopicList />} />
      <Route path={RoutePaths.topic} element={<Topic />} />
    </Routes>
  );
};
