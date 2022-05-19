import { Route, Routes } from 'react-router-dom';
import { AddTopicPage } from '../add-topic-page';
import { EditTopicPage } from '../edit-topic-page';
import { Login, Register } from '../login-system';
import { TopicList } from '../topic-list-page';
import { Topic } from '../topic-view-page';
import { RoutePaths } from './';

export const Router = () => {
  return (
    <Routes>
      <Route path={RoutePaths.addTopic} element={<AddTopicPage />} />
      <Route path={RoutePaths.login} element={<Login />} />
      <Route path={RoutePaths.register} element={<Register />} />
      <Route index element={<TopicList />} />
      <Route path={RoutePaths.topic} element={<Topic />} />
      <Route path={RoutePaths.editTopic} element={<EditTopicPage />} />
    </Routes>
  );
};
