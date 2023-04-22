import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  authTokenInfo: {},
  userInfo: {}
};

export const getUser = createAsyncThunk('user/getUser', async () => {
  // let response = await axios.get(`api/getUser/${id}`).then((r) => r.data);
  // return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, { payload }) {
      return payload;
    },
    clearUser() {
      return initialState;
    }
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => action.payload,
    [getUser.rejected]: (state, action) => ({ ...state, ...action.payload })
  }
});

export const { setUser, clearUser } = userSlice.actions;
