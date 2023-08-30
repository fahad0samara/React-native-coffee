import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: '', // Initialize role as an empty string
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role; // Set the role from the payload
    },
    logout: state => {
      state.user = null;
      state.role = ''; // Clear the role when logging out
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
