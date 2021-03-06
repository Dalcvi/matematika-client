import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { loadingReducer } from '../loading';
import { topicReducer } from '../topic-view-page';
import { userReducer } from '../user';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
    topic: topicReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
