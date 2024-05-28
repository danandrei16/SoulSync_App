import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileSettings.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { auth } from "./firebase";

function ProfileSettings() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [starSign, setStarSign] = useState("");
  const [birthDay, setBirthDay] = useState(""); // Add birthTime state
  const [birthTime, setBirthTime] = useState(""); // Add birthTime state
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [preference, setPreference] = useState("");
  const [location, setLocation] = useState("");
  const [height, setHeight] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [pictureUrl, setPictureUrl] = useState("");
  const navigate = useNavigate();

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      const previewUrl = URL.createObjectURL(file);
      setPictureUrl(previewUrl);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
        setBirthDay(userData.birthDay || ""); // Fetch birthTime
        setBirthTime(userData.birthTime || ""); // Fetch birthTime
        setDescription(userData.description || "");
        setGender(userData.gender || "");
        setPreference(userData.preference || "");
        setLocation(userData.location || "");
        setHeight(userData.height || "");
        setLookingFor(userData.lookingFor || "");
        setPictureUrl(userData.picture || ""); // Set the profile picture URL if it exists
        // Calculate and set the age
        if (userData.birthDay) {
          setAge(calculateAge(userData.birthDay));
          console.log(calculateAge(userData.birthDay));
          setStarSign(getSunSign(userData.birthDay));
        }
        
      }
      
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const calculateAge = (birthDate) => {
    const today = new Date();
    console.log('Today:', today);
    
    const birthDateObj = new Date(birthDate);
    console.log('Birth Date:', birthDateObj);
    
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    console.log('Age:', age);
  
    return age;
  };
  
  const getSunSign = (birthDate) => {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1; // Month is zero-indexed in JavaScript
    const day = date.getDate();
  
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return "Aries";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return "Taurus";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return "Gemini";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      return "Cancer";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return "Leo";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return "Virgo";
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      return "Libra";
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return "Scorpio";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return "Sagittarius";
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return "Capricorn";
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return "Aquarius";
    } else {
      return "Pisces";
    }
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
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

      if (userDocument.empty) {
        console.error("User document not found.");
        return;
      }

      const documentId = userDocument.docs[0].id;

      await firebase.firestore().collection("people").doc(documentId).update({
        name,
        age,
        starSign,
        birthDay,
        birthTime,
        description,
        gender,
        preference,
        location,
        height,
        lookingFor,
      });

      console.log("Profile information updated successfully!");

      // Clear input fields and reset profile picture state
      setName("");
      setBirthDay( ""); // Fetch birthTime
      setBirthTime(""); // Reset birthTime
      setDescription("");
      setGender("");
      setPreference("");
      setLocation("");
      setHeight("");
      setLookingFor("");
      setProfilePicture(null);
      setSavedMessage("Profile information saved successfully!");

      // Redirect to /profile after a delay
      setTimeout(() => {
        navigate("/profile");
      }, 500); // 500 milliseconds delay
    } catch (error) {
      console.error("Error updating profile information:", error);
    }
  };

  const handleSavePicture = async () => {
    try {
      if (!profilePicture) {
        console.error("No picture selected.");
        return;
      }

      const storageRef = firebase.storage().ref();
      const profilePictureRef = storageRef.child(
        `${auth.currentUser.uid}/profilePicture/${profilePicture.name}`
      );
      await profilePictureRef.put(profilePicture);
      const url = await profilePictureRef.getDownloadURL();

      const userDocument = await firebase
        .firestore()
        .collection("people")
        .where("email", "==", auth.currentUser.email)
        .get();

      if (userDocument.empty) {
        console.error("User document not found.");
        return;
      }

      const documentId = userDocument.docs[0].id;

      await firebase.firestore().collection("people").doc(documentId).update({
        picture: url,
      });

      setPictureUrl(url);
      console.log("Profile picture updated successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 200); // 500 milliseconds delay

    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label className="input-label profile-picture-label">
          <span>Profile Picture:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="profile-picture-input"
          />
          {pictureUrl && (
            <img src={pictureUrl} alt="Profile" className="profile-picture-preview" />
          )}
        </label>
        <button type="button" className="save-button" onClick={handleSavePicture}>
          Save Picture
        </button>
      </form>
      
      <br/>

      <form onSubmit={handleSubmit}>
        <label className="input-label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        
        <label className="input-label">
          Birth Day:
          <input
            type="date"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />
        </label>
        
        <label className="input-label">
          Birth Time:
          <input
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
          />
        </label>
        
        <label className="input-label">
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label className="input-label">
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="select-field">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="input-label">
          Preference:
          <select
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            className="select-field"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>
        </label>

        <label className="input-label">
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>

        <label className="input-label">
          Height:
          <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        
        <label className="input-label">
          Looking For:
          <select
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            className="select-field"
          >
            <option value="">Select</option>
            <option value="long-term">Long Term Relationship</option>
            <option value="casual">Something Casual</option>
            <option value="friends">Friends</option>
          </select>
        </label>

        <button type="submit" className="save-button">
          Save Information
        </button>
        {savedMessage && <p>{savedMessage}</p>}
      </form>
    </div>
  );
}

export default ProfileSettings;
