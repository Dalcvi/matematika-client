import { useMemo } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  REGISTER_LOADING_STATE_ID,
  REGISTER_URI,
  SUCCESSFUL_REGISTRATION,
} from '.';
import { setLoadingState } from '../../loading';
import { LoginSystemRegisterPostBody } from '../';

export const useRegistration = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const registerAccount = useMemo(
    () => async (registrationInfo: LoginSystemRegisterPostBody) => {
      dispatch(
        setLoadingState({ id: REGISTER_LOADING_STATE_ID, isLoading: true }),
      );
      return axios
        .post(REGISTER_URI, registrationInfo)
        .then(() => {
          dispatch(
            setLoadingState({
              id: REGISTER_LOADING_STATE_ID,
              isLoading: false,
            }),
          );
          navigateTo('/login');
        })
        .catch((reason: AxiosError) => {
          dispatch(
            setLoadingState({
              id: REGISTER_LOADING_STATE_ID,
              isLoading: false,
            }),
          );
          const title = reason.response?.status
            ? `Error ${reason.response?.status}:`
            : 'Error:';
        });
    },
    [dispatch, navigateTo],
  );

  return { registerAccount };
};
