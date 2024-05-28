import React, { useEffect, useState } from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Import the NotificationsIcon
import { IconButton, Popover, List, ListItem, ListItemText } from '@mui/material'; // Import components from Material-UI
import { Link } from 'react-router-dom';
import { auth } from './firebase';

function Header({ backButton }) {
    const [userEmail, setUserEmail] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail('');
            }
        });
    
        return () => unsubscribe();
    }, []);

    const handleNotificationsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseNotifications = () => {
        setAnchorEl(null);
    };
    
    return (
        <div className='header'>
            <Link to='/profile'>
                <IconButton>
                    <PersonIcon fontSize='large' className='header__icon' />
                </IconButton>
            </Link>
            
            <Link to='/'>
                <IconButton>
                    <HomeIcon fontSize='large' className='header__icon' />
                </IconButton>
            </Link>
            
            {/* Use Badge component to display notification count */}
            <IconButton onClick={handleNotificationsClick}>
                <NotificationsIcon fontSize='large' className='header__icon' />
            </IconButton>

            {/* Render notifications as a popover */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseNotifications}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List>
                    {/* Replace this with your notification data */}
                    <ListItem button>
                        <ListItemText primary="Notification 1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Notification 2" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Notification 3" />
                    </ListItem>
                </List>
            </Popover>

            <Link to='/chat'>
                <IconButton>
                    <ForumIcon fontSize='large' className='header__icon' />
                </IconButton>
            </Link>
        </div>
    );
}

export default Header;
