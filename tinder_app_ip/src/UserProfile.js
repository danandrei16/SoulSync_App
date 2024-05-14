import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { auth } from "./firebase";
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/Logout';

import './UserProfile.css'; // Import CSS file for styling

function UserProfile( {backButton} ) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [preference, setPreference] = useState("");
  const [location, setLocation] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [starSign, setStarSign] = useState("");
  const [lookingFor, setLookingFor] = useState("");

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
        setName(userData.name || "");
        setAge(userData.age || "");
        setDescription(userData.description || "");
        setGender(userData.gender || "");
        setPreference(userData.preference || "");
        setLocation(userData.location || "");
        setHeight(userData.height || "");
        setWeight(userData.weight || "");
        setStarSign(userData.starSign || "");
        setLookingFor(userData.lookingFor || "");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div className="user-profile">
        {/* Render user information */}
        <div>
          <label>Name:</label>
          <div>{name}</div>
        </div>
        <div>
          <label>Age:</label>
          <div>{age}</div>
        </div>
        <div>
          <label>Description:</label>
          <div>{description}</div>
        </div>
        <div>
          <label>Gender:</label>
          <div>{gender}</div>
        </div>
        <div>
          <label>Preference:</label>
          <div>{preference}</div>
        </div>
        <div>
          <label>Location:</label>
          <div>{location}</div>
        </div>
        <div>
          <label>Height:</label>
          <div>{height}</div>
        </div>
        <div>
          <label>Weight:</label>
          <div>{weight}</div>
        </div>
        <div>
          <label>Star Sign:</label>
          <div>{starSign}</div>
        </div>
        <div>
          <label>Looking For:</label>
          <div>{lookingFor}</div>
        </div>
        {/* Add a button to navigate to profile settings */}
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
