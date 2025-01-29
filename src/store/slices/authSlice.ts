import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    roles: string[]; // List of user roles
    currentRole: string | null; // Currently active role
    isAuthenticated: boolean; // Whether the user is logged in
}

const initialState: AuthState = {
    roles: [],
    currentRole: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRoles(state, action: PayloadAction<string[]>) {
            state.roles = action.payload;
        },
        setCurrentRole(state, action: PayloadAction<string | null>) {
            state.currentRole = action.payload;
        },
        setAuthentication(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
        logout(state) {
            state.roles = [];
            state.currentRole = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setRoles, setCurrentRole, setAuthentication, logout } = authSlice.actions;

export default authSlice.reducer;
