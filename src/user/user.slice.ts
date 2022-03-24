import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './';

const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    logoutUser: () => {
      return null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
