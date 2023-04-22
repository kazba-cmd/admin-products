import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  currentLanguage: 'ru'
};

export const stuffSlice = createSlice({
  name: 'stuff',
  initialState,
  reducers: {
    changeTheme(state, action) {
      state.theme = action.payload;
    }
  },
  extraReducers: {}
});

export const { changeTheme } = stuffSlice.actions;
