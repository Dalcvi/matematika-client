import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, LoadingState } from '.';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {} as InitialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<LoadingState>) => {
      return { ...state, [action.payload.id]: action.payload.isLoading };
    },
  },
});

export const loadingReducer = loadingSlice.reducer;
export const { setLoadingState } = loadingSlice.actions;
