import {
  createSlice,
  // PayloadAction
} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
}

// Check localStorage to determine if the user is already authenticated
const storedRoles: string[] = JSON.parse(localStorage.getItem('roles') || '[]');
const isUserAuthenticated = storedRoles.length > 0;

const initialState: AuthState = {
  isAuthenticated: isUserAuthenticated,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('roles'); // Remove stored roles
      localStorage.removeItem('currentRole'); // Remove stored current role
    },
  },
});

// **Selectors**
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

// **Actions**
export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
