import React, { useEffect, useState } from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { auth } from './firebase'; // Import the auth instance from your firebase.js file

function Header({ backButton }) {
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
            
            <Link to='/chat'>
                <IconButton>
                    <ForumIcon fontSize='large' className='header__icon' />
                </IconButton>
            </Link>
            
        </div>
    );
}

export default Header;
