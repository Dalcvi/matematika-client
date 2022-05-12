import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Topic } from './';
import { TopicProps } from './topic.types';

const topicSlice = createSlice({
  name: 'topic',
  initialState: [] as TopicProps[],
  reducers: {
    setTopic: (state, action: PayloadAction<TopicProps>) => {
      const filteredState = state.filter(
        topic => topic.id !== action.payload.id,
      );

      return [...filteredState, action.payload];
    },

    setTopics: (state, action: PayloadAction<TopicProps[]>) => {
      return [...action.payload];
    },
  },
});

export const { setTopic, setTopics } = topicSlice.actions;
export const topicReducer = topicSlice.reducer;
