import React from 'react';
import { Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface LayoutProps {
    title: React.ReactNode; // Allows dynamic title (e.g., with icons or actions)
    children: React.ReactNode;
    sidebar?: React.ReactNode; // Optional sidebar content
    className?: string; // Optional custom className for additional styling
    isSidebarOpen?: boolean; // For responsive sidebar
    toggleSidebar?: () => void; // Function to toggle sidebar visibility
}

const Layout: React.FC<LayoutProps> = ({ title, children, sidebar, className, isSidebarOpen, toggleSidebar }) => {
    return (
        <Box className={`flex min-h-screen bg-gray-100 ${className || ''}`}>
            {/* Sidebar */}
            {sidebar && (
                <>
                    {/* Persistent Sidebar for Larger Screens */}
                    {/* <Box
                        className="hidden md:block"
                        sx={{
                            width: 250,
                            // backgroundColor: 'secondary.main',
                            color: 'white',
                            padding: 2,
                        }}
                    > */}
                        {sidebar}
                    {/* </Box> */}

                    {/* Drawer Sidebar for Smaller Screens */}
                    <Drawer
                        anchor="left"
                        open={!!isSidebarOpen}
                        onClose={toggleSidebar}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': {
                                width: 250,
                                backgroundColor: 'secondary.main',
                                color: 'white',
                                padding: 2,
                            },
                        }}
                    >
                        {sidebar}
                    </Drawer>
                </>
            )}

            {/* Main Content */}
            <Box className="flex flex-col flex-grow">
                <Box
                    component="header"
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        padding: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Sidebar Toggle Button for Smaller Screens */}
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleSidebar}
                        sx={{ display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</h1>
                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        padding: 2,
                    }}
                >
                    {children}
                </Box>

                <Box
                    component="footer"
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        textAlign: 'center',
                        padding: 2,
                    }}
                >
                    &copy; 2025 IDHMS
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
