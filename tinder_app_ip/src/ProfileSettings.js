import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./ProfileSettings.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { auth } from "./firebase";

function ProfileSettings() {
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
  const [savedMessage, setSavedMessage] = useState(""); // State to handle the "Successfully saved" message
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

// Function to handle profile picture upload
const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
    };

  useEffect(() => {
    // Fetch user profile data from Firestore when component mounts
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      if (!auth.currentUser) {
        console.error("User is not logged in.");
        return;
      }

      // Fetch the document from Firestore based on the user's email
      const userDocument = await firebase
        .firestore()
        .collection("people")
        .where("email", "==", auth.currentUser.email)
        .get();

      if (!userDocument.empty) {
        const userData = userDocument.docs[0].data();
        // Set the state with user profile data
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!auth.currentUser) {
        console.error("User is not logged in.");
        return;
      }
  
      // Fetch the document from Firestore based on the user's email
      const userDocument = await firebase
        .firestore()
        .collection("people")
        .where("email", "==", auth.currentUser.email)
        .get();
  
      // Check if the document exists
      if (userDocument.empty) {
        console.error("User document not found.");
        return;
      }
  
      // Update the existing document with new fields
      const documentId = userDocument.docs[0].id;
      await firebase.firestore().collection("people").doc(documentId).update({
        name,
        age,
        description,
        gender,
        preference,
        location,
        height,
        weight,
        starSign,
        lookingFor,
      });
  
      console.log("Profile information updated successfully!");
  
      // Clear the input fields
      setName("");
      setAge("");
      setDescription("");
      setGender("");
      setPreference("");
      setLocation("");
      setHeight("");
      setWeight("");
      setStarSign("");
      setLookingFor("");
      setSavedMessage("Profile information saved successfully!"); // Set the saved message
    } catch (error) {
      console.error("Error updating profile information:", error);
    }
  };
  

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          Name:
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
        
        <label className="input-label">
          Age:
          <input type="number" onChange={(e) => setAge(e.target.value)} />
        </label>
        
        <label className="input-label profile-picture-label">
            <span>Profile Picture:</span>
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleProfilePictureChange} 
                className="profile-picture-input" 
            />
            {profilePicture && (
                <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="profile-picture-preview" />
            )}
        </label>
        <label className="input-label">
          Description:
          <textarea onChange={(e) => setDescription(e.target.value)} />
        </label>
        
        <label className="input-label">
          Gender:
          <select onChange={(e) => setGender(e.target.value)} className="selet-field2">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        
        <label className="input-label">
          Preference:
          <select onChange={(e) => setPreference(e.target.value)} className="selet-field2">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>
        </label>
        
        <label className="input-label">
          Location:
          <input type="text" onChange={(e) => setLocation(e.target.value)} />
        </label>
        
        <label className="input-label">
          Height:
          <input type="text" onChange={(e) => setHeight(e.target.value)} />
        </label>
        
        <label className="input-label">
          Weight:
          <input type="text" onChange={(e) => setWeight(e.target.value)} />
        </label>
        
        <label className="input-label">Star Sign:
            <select onChange={(e) => setStarSign(e.target.value)} className="select-field">
                <option value="">Select</option>
                <option value="Aries">Aries</option>
                <option value="Taurus">Taurus</option>
                <option value="Gemini">Gemini</option>
                <option value="Cancer">Cancer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Sagittarius">Sagittarius</option>
                <option value="Capricorn">Capricorn</option>
                <option value="Aquarius">Aquarius</option>
                <option value="Pisces">Pisces</option>
            </select>
        </label>
        
        <label className="input-label">
          Looking For:
          <select onChange={(e) => setLookingFor(e.target.value)} className="select-field">
            <option value="">Select</option>
            <option value="long-term">Long Term Relationship</option>
            <option value="casual">Something Casual</option>
            <option value="friends">Friends</option>
          </select>
        </label>
        
        <button type="submit">Save</button>
        {savedMessage && <p>{savedMessage}</p>} {/* Render the saved message if it exists */}
      </form>
      <Link to="/profile">Go back to profile</Link> {/* Link to the profile page */}
    </div>
  );
}

export default ProfileSettings;
