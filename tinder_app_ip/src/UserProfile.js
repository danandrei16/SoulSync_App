import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import './UserProfile.css'; // Import CSS file for styling

function UserProfile() {
  return (
    <div>
      <h1>User Profile</h1>
      <div className="user-profile">
        {/* Render user information */}
        <div>
          <label>Name:</label>
          <div>aaaa</div>
        </div>
        {/* Other user information fields */}
        {/* Add a button to navigate to profile settings */}
        <Link to="/profile_settings">
          <button className="settings-button">Edit Profile</button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
