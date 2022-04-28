import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoadingState } from '../loading';
import { TopicProps, TOPIC_LOADING_STATE_ID } from '.';
import { setTopic } from './topic.slice';

const GET_TOPIC = 'topic/GET_TOPIC';

const fakeTopic: TopicProps = {
  id: 'id',
  title: 'title',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  index: 0,
  questions: [
    {
      id: 'id1',
      topicId: 'id',
      possibleAnswers: ['1', '2', '3', '4', '5'],
      correctAnswer: '2',
      questionText: 'questionText',
    },
    {
      id: 'id2',
      topicId: 'id',
      possibleAnswers: ['1', '2', '3', '4', '5'],
      correctAnswer: '2',
      questionText: 'questionText',
    },
    {
      id: 'id3',
      topicId: 'id',
      possibleAnswers: ['1', '2', '3', '4', '5'],
      correctAnswer: '2',
      questionText: 'questionText',
    },
  ],
};

export const getTopic = createAsyncThunk(
  GET_TOPIC,
  async (topicId: string, { dispatch }) => {
    dispatch(setLoadingState({ id: TOPIC_LOADING_STATE_ID, isLoading: true }));
    setTimeout(() => {
      dispatch(setTopic(fakeTopic));
      dispatch(
        setLoadingState({ id: TOPIC_LOADING_STATE_ID, isLoading: false }),
      );
    }, 750);

    // axios
    //   .get<User>(GET_USER_URI)
    //   .then(response => {
    //     dispatch(setUser(response.data));
    //   })
    //   .finally(() => {
    //     dispatch(
    //       setLoadingState({
    //         id: USER_LOADING_STATE_ID,
    //         isLoading: false,
    //       }),
    //     );
    //   });
  },
);
