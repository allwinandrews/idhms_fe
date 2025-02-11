import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  setCurrentRole,
  selectRoles,
  selectCurrentRole,
  clearRoles,
} from '../store/slices/roleSlice';
import { logout } from '../store/slices/authSlice';
import { RoleKeys } from '../assets/types';
import CustomButton from '../components/common/CustomButton';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get roles from Redux store
  const roles = useAppSelector(selectRoles);
  const currentRole = useAppSelector(selectCurrentRole);

  const handleRoleChange = (newRole: RoleKeys) => {
    dispatch(setCurrentRole(newRole));
    navigate(`/${newRole.toLowerCase()}-dashboard`);
  };

  const handleLogout = () => {
    dispatch(logout()); // Logout user
    dispatch(clearRoles()); // Clear roles from Redux
    navigate('/login');
    // navigate('/login6');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'primary.main',
        height: 100,
        justifyContent: 'center',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
        }}
      >
        {/* Sidebar Toggle & Home Link */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={toggleSidebar}
            edge="start"
            sx={{ color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Home
          </Typography>
        </Box>

        {/* Role Selector & Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {roles.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
              >
                Current Role:
              </Typography>
              {roles.length === 1 ? (
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                  }}
                >
                  {currentRole}
                </Typography>
              ) : (
                <FormControl
                  sx={{
                    minWidth: 200,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <InputLabel
                    sx={{
                      fontSize: 14,
                      color: 'black',
                      '&.Mui-focused': { color: 'primary.main' },
                      '&.MuiFormLabel-filled': {
                        transform: 'translate(12px, -6px) scale(0.75)',
                      },
                    }}
                    shrink={!!currentRole}
                  >
                    Select Role
                  </InputLabel>
                  <Select
                    value={roles.includes(currentRole) ? currentRole : ''}
                    onChange={(e) =>
                      handleRoleChange(e.target.value as RoleKeys)
                    }
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'secondary.main',
                      },
                      '& .MuiSelect-icon': { color: 'primary.main' },
                    }}
                  >
                    {roles.map((role) => (
                      <MenuItem
                        key={role}
                        value={role}
                        sx={{
                          fontSize: 14,
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                          },
                        }}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
          )}
          <CustomButton
            label="Logout"
            onClick={handleLogout}
            color="error"
            variant="contained"
            sx={{ fontSize: 14, padding: '6px 16px', minWidth: '100px' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
