import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./ProfileSettings.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage"; // Import storage module
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
  const [savedMessage, setSavedMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(""); // State to store picture URL
  const navigate = useNavigate();

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
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
        setAge(userData.age || "");
        setDescription(userData.description || "");
        setGender(userData.gender || "");
        setPreference(userData.preference || "");
        setLocation(userData.location || "");
        setHeight(userData.height || "");
        setWeight(userData.weight || "");
        setStarSign(userData.starSign || "");
        setLookingFor(userData.lookingFor || "");
        setPictureUrl(userData.picture || ""); // Set picture URL
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

      // Upload profile picture to Firebase Storage if a picture is selected
      let pictureUrl = "";
      if (profilePicture) {
        const storageRef = firebase.storage().ref();
        const profilePictureRef = storageRef.child(
          `${auth.currentUser.uid}/profilePicture/${profilePicture.name}`
        );
        await profilePictureRef.put(profilePicture);
        pictureUrl = await profilePictureRef.getDownloadURL();
        console.log("Profile picture uploaded successfully! URL:", pictureUrl);
      }
      else {
        pictureUrl = "https://firebasestorage.googleapis.com/v0/b/soulsync-a49b2.appspot.com/o/default.jpg?alt=media&token=bdaedd0d-8552-4841-884e-251a13f4776d"
      }

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
        picture: pictureUrl, // Store profile picture URL in 'picture' field
      });

      console.log("Profile information updated successfully!");

      // Clear input fields and reset profile picture state
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
      setProfilePicture(null);
      setSavedMessage("Profile information saved successfully!");

      // Redirect to /profile after a delay
      setTimeout(() => {
        navigate("/profile");
      }, 500); // 1000 milliseconds delay
    } catch (error) {
      console.error("Error updating profile information:", error);
    }
  };

  return (
    <div>
      <h1>User Profile Details</h1>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label className="input-label">
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
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
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile"
              className="profile-picture-preview"
            />
          )}
        </label>

        <label className="input-label">
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label className="input-label">
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="selet-field2">
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
            className="selet-field2"
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
          Star Sign:
          <select
            value={starSign}
            onChange={(e) => setStarSign(e.target.value)}
            className="select-field"
          >
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
          Save
        </button>
        {savedMessage && <p>{savedMessage}</p>}
      </form>
    </div>
  );
}

export default ProfileSettings;