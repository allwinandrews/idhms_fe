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
import { useRoles } from '../contexts/RoleContext';
import { RoleKeys } from '../assets/types';
import CustomButton from '../components/common/CustomButton'; // Reusable button component

interface NavbarProps {
    toggleSidebar: () => void; // Function to toggle the sidebar
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
    const { roles, setRoles, currentRole, setCurrentRole } = useRoles(); // Roles list and updater from context
    const navigate = useNavigate();

    const handleRoleChange = (newRole: RoleKeys) => {
        setCurrentRole(newRole); // Update selected role
        navigate(`/${newRole.toLowerCase()}-dashboard`); // Navigate to the new role's dashboard
    };

    const handleLogout = () => {
        localStorage.removeItem('currentRole'); // Clear current role from localStorage
        localStorage.removeItem('roles'); // Clear roles from localStorage
        setRoles(null); // Update context
        setCurrentRole(null);
        navigate('/login'); // Redirect to login page
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'primary.main',
                height: 100, // Increase height to add spacing
                justifyContent: 'center', // Center the toolbar within the AppBar
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px', // Add padding for more spacing
                }}
            >
                {/* Sidebar Toggle & Home Link */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        onClick={toggleSidebar}
                        edge="start"
                        sx={{
                            color: 'white',
                        }}
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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    {roles && roles.length > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}
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
                                            '&.Mui-focused': {
                                                color: 'primary.main',
                                            },
                                            '&.MuiFormLabel-filled': {
                                                transform: 'translate(12px, -6px) scale(0.75)', // Adjust shrink position
                                            },
                                        }}
                                        shrink={!!currentRole} // Ensures the label shrinks when a value exists
                                    >
                                        Select Role
                                    </InputLabel>
                                    <Select
                                        value={currentRole || ''}
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
                                            '& .MuiSelect-icon': {
                                                color: 'primary.main',
                                            },
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
                                                {role}
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
                        sx={{
                            fontSize: 14,
                            padding: '6px 16px',
                            minWidth: '100px',
                        }}
                    />
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
