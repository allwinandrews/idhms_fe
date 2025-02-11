import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type RoleKeys = 'admin' | 'dentist' | 'receptionist' | 'patient';

interface RoleState {
  roles: RoleKeys[];
  currentRole: RoleKeys;
}

const DEFAULT_ROLE: RoleKeys = 'patient'; // Default fallback role

// Load roles from localStorage if they exist
const storedRoles = localStorage.getItem('roles');
const parsedRoles: RoleKeys[] = storedRoles ? JSON.parse(storedRoles) : [];

const initialState: RoleState = {
  roles: parsedRoles,
  currentRole: parsedRoles.length > 0 ? parsedRoles[0] : DEFAULT_ROLE,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<RoleKeys[]>) => {
      state.roles = action.payload;
      localStorage.setItem('roles', JSON.stringify(action.payload)); // ✅ Save roles to localStorage
      if (!action.payload.includes(state.currentRole)) {
        state.currentRole =
          action.payload.length > 0 ? action.payload[0] : DEFAULT_ROLE;
      }
    },
    setCurrentRole: (state, action: PayloadAction<RoleKeys>) => {
      state.currentRole = action.payload;
    },
    clearRoles: (state) => {
      state.roles = [];
      state.currentRole = DEFAULT_ROLE;
      localStorage.removeItem('roles'); // ✅ Remove roles from localStorage on logout
    },
  },
});

export const { setRoles, setCurrentRole, clearRoles } = roleSlice.actions;
export const selectRoles = (state: RootState) => state.role.roles;
export const selectCurrentRole = (state: RootState) => state.role.currentRole;
export default roleSlice.reducer;
