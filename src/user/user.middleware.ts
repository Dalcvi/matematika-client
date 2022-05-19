import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, setUser, logoutUser } from '.';
import { APP_LOADING_STATE_ID } from '../app';
import { setLoadingState } from '../loading';
import { GET_USER_URI, LOGOUT_USER_URI, USER_LOADING_STATE_ID } from './';

const AUTHENTICATE_USER = 'user/AUTHENTICATE_USER';
const LOGOUT = 'user/LOGOUT';

export const authenticateUser = createAsyncThunk(
  AUTHENTICATE_USER,
  async (_, { dispatch }) => {
    dispatch(setLoadingState({ id: USER_LOADING_STATE_ID, isLoading: true }));
    axios
      .get<User>(GET_USER_URI, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` },
      })
      .then(response => {
        dispatch(setUser(response.data));
      })
      .finally(() => {
        dispatch(
          setLoadingState({
            id: USER_LOADING_STATE_ID,
            isLoading: false,
          }),
        );
      });
  },
);

export const logout = createAsyncThunk(LOGOUT, async (_, { dispatch }) => {
  dispatch(setLoadingState({ id: APP_LOADING_STATE_ID, isLoading: true }));
  axios
    .delete(LOGOUT_USER_URI)
    .then(() => {
      dispatch(logoutUser());
    })
    .finally(() => {
      dispatch(setLoadingState({ id: APP_LOADING_STATE_ID, isLoading: false }));
    });
});
