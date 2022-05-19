import { useAppSelector } from './../../store/store.hooks';
import { useMemo } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { LOGIN_LOADING_STATE_ID, LOGIN_URI, SUCCESSFUL_LOGIN } from './';
import { setLoadingState } from '../../loading';
import { LoginSystemLoginPostBody } from '..';
import { authenticateUser, setUser } from '../../user';

export const useLogin = () => {
  const dispatch = useDispatch();
  const state = useAppSelector(state => state);
  console.log(state);

  const login = useMemo(
    () => async (loginInfo: LoginSystemLoginPostBody) => {
      dispatch(
        setLoadingState({
          id: LOGIN_LOADING_STATE_ID,
          isLoading: true,
        }),
      );
      return axios
        .post(LOGIN_URI, loginInfo)
        .then(data => {
          window.localStorage.setItem('auth', data.data);
          dispatch(authenticateUser());
        })
        .then(() => {
          dispatch(
            setLoadingState({
              id: LOGIN_LOADING_STATE_ID,
              isLoading: false,
            }),
          );
        })
        .catch((reason: AxiosError) => {
          const title = reason.response?.status
            ? `Error ${reason.response?.status}:`
            : 'Error:';
          dispatch(
            setLoadingState({
              id: LOGIN_LOADING_STATE_ID,
              isLoading: false,
            }),
          );
        });
    },
    [dispatch],
  );

  return { login };
};
