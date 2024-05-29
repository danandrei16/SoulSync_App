import React, { useState, useEffect } from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Popover, List, ListItem, ListItemText, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from './auth'; // Import the useAuth hook from your auth.js file
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'; // Import firestore correctly
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Import the DarkModeIcon component from Material-UI

function Header({ backButton }) {
    const { currentUser } = useAuth(); // Get the currently authenticated user from the auth context
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [darkMode, setDarkMode] = useState(false); // State variable for dark mode

    useEffect(() => {
        if (currentUser) {
            const unsubscribe = firebase.firestore().collection('people').doc(currentUser.uid)
                .onSnapshot((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        setNotifications(userData.notifications || []);
                    } else {
                        setNotifications([]);
                    }
                });

            return () => unsubscribe();
        }
    }, [currentUser]);

    const handleNotificationsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseNotifications = () => {
        setAnchorEl(null);
        if (currentUser) {
            // Clear notifications after closing
            firebase.firestore().collection('people').doc(currentUser.uid).update({
                notifications: []
            }).then(() => {
                setNotifications([]);
            }).catch((error) => {
                console.error("Error clearing notifications: ", error);
            });
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.style.backgroundColor = darkMode ? "white" : "gray"; // Save dark mode preference to local storage or user settings
    };

    return (
        <div className='header'>
            <IconButton onClick={toggleDarkMode}> {/* Dark mode button */}
                <DarkModeIcon fontSize='large' className='header__icon' />
            </IconButton>
            
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
            
            <Link to='/chat'>
                <IconButton>
                    <ForumIcon fontSize='large' className='header__icon' />
                </IconButton>
            </Link>

            {/* Use Badge component to display notification count */}
            <IconButton onClick={handleNotificationsClick}>
                <Badge badgeContent={notifications.length} color="secondary">
                    <NotificationsIcon fontSize='large' className='header__icon' />
                </Badge>
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
                <List style={{ zIndex: 1000, position: 'relative' }}>
                    {notifications.map((notification, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={notification} />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </div>
    );
}

export default Header;
