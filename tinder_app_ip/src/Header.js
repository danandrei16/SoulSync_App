import React from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import ExitToAppIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { auth } from './firebase'; // Import the auth instance from your firebase.js file

function Header({ backButton }) {
    const history = useNavigate();

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await auth.signOut(); // Sign out the current user
            // Redirect to the login page or any other page after logout
            history.replace('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        // BEM
        <div className='header'>
            
            <Link to='/profile'>
                <IconButton>
                    <PersonIcon fontSize='large' className='header__icon' />
                </IconButton>
            </Link>
            
            <Link to='/'>
                <img
                    className='header__logo'
                    src='https://i.ibb.co/7RfGh8N/Whats-App-Image-2024-05-11-at-19-47-30-9884f067.jpg'
                    alt='Tinder Logo'
                ></img>
            </Link>
            <Link to='/chat'>
                <IconButton>
                    <ForumIcon fontSize='large' className='header__icon' />
                </IconButton>
            </Link>
            {/* Logout button */}
            <IconButton onClick={handleLogout}>
                <ExitToAppIcon fontSize='large' className='header__icon' />
            </IconButton>
        </div>
    );
}

export default Header;
