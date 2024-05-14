import React, { useEffect, useState } from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import ExitToAppIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { auth } from './firebase'; // Import the auth instance from your firebase.js file
import { set } from 'firebase/database';

function Header({ backButton }) {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

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
    

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await auth.signOut(); // Sign out the current user
            // Redirect to the login page after logout
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className='header'>
            
            <Link to='/profile'>
                <IconButton>
                    <PersonIcon fontSize='large' className='header__icon' />
                    <p>{userEmail}</p> {/* Display the user's email here */}
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
            
            <Link to='/'>
                <IconButton onClick={handleLogout}>
                    <ExitToAppIcon fontSize='large' className='header__icon' />
                </IconButton>
            </Link>
        </div>
    );
}

export default Header;
