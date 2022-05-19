import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoadingState } from '../loading';
import { TopicProps, TOPIC_LOADING_STATE_ID } from '.';
import { setTopic } from './topic.slice';

const GET_TOPIC = 'topic/GET_TOPIC';

export const getTopic = createAsyncThunk(
  GET_TOPIC,
  async (topicId: string, { dispatch }) => {
    dispatch(setLoadingState({ id: TOPIC_LOADING_STATE_ID, isLoading: true }));
    setTimeout(() => {
      // dispatch(setTopic(fakeTopic));
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
