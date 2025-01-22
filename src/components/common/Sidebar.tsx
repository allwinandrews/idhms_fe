import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

interface SidebarProps {
    links: { label: string; path: string }[];
    isOpen: boolean; // Controls if the sidebar is open
    toggleSidebar: () => void; // Function to toggle the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ links, isOpen, toggleSidebar }) => {
    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={toggleSidebar}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 250,
                    background: '#1e88e5',
                    color: 'white',
                },
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                <h3>Menu</h3>
                <IconButton onClick={toggleSidebar} style={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </div>
            <List>
                {links.map((link, index) => (
                    <ListItem
                        key={index}
                        component={Link}
                        to={link.path}
                        style={{ color: 'white', marginBottom: '8px' }}
                        onClick={toggleSidebar} // Close the sidebar on link click
                    >
                        <ListItemText primary={link.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
