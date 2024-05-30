import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { auth } from "./firebase";
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/Logout';
import Card from './Card'; // Import the Card component
import './UserProfile.css'; // Import CSS file for styling

function UserProfile( {backButton} ) {

  useEffect(() => {
    fetchUserProfile();
  }, []);

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

  const fetchUserProfile = async () => {
    try {
      if (!auth.currentUser) {
        console.error("User is not logged in.");
        return;
      }

      const userDocument = await firebase
        .firestore()
        .collection("people")
        .where("email", "==", auth.currentUser.email)
        .get();

      if (!userDocument.empty) {
        const userData = userDocument.docs[0].data();
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };


  return (
    <div>

      <div className="user-profile dark">
      <div>
            <h1 className="dark-user-profile">User Profile</h1>
            {/* Render the Tinder card for the current user */}
            <div>
                <Card />
            </div>
        </div>
        <Link to="/profile_settings">
          <button className="settings-button">Edit Profile</button>
        </Link>

        <Link to='/'>
            <IconButton onClick={handleLogout}>
                <ExitToAppIcon fontSize='large' className='header__icon' />
            </IconButton>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;