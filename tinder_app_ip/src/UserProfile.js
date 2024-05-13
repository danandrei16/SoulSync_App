import React, { useState } from "react";
import "./UserProfile.css";

function UserProfile() {
  const [name, setName] = useState(""); // State for name
  const [age, setAge] = useState(""); // State for age
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [description, setDescription] = useState(""); // State for description
  const [gender, setGender] = useState(""); // State for gender
  const [preference, setPreference] = useState(""); // State for preference
  const [location, setLocation] = useState(""); // State for location
  const [height, setHeight] = useState(""); // State for height
  const [weight, setWeight] = useState(""); // State for weight
  const [starSign, setStarSign] = useState(""); // State for star sign
  const [lookingFor, setLookingFor] = useState(""); // State for looking for

  // Function to handle profile picture upload
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can implement logic to update user information in the backend
    console.log("Submitted:", {
      name,
      age,
      profilePicture,
      description,
      gender,
      preference,
      location,
      height,
      weight,
      starSign,
      lookingFor,
    });
  };

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <label>
          Profile Picture:
          <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Preference:
          <select value={preference} onChange={(e) => setPreference(e.target.value)}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <label>
          Height:
          <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <br />
        <label>
          Weight:
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <br />
        <label>
          Star Sign:
          <select value={starSign} onChange={(e) => setStarSign(e.target.value)}>
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
        <br />
        <label>
          Looking For:
          <select value={lookingFor} onChange={(e) => setLookingFor(e.target.value)}>
            <option value="">Select</option>
            <option value="long-term">Long Term Relationship</option>
            <option value="casual">Something Casual</option>
            <option value="friends">Friends</option>
          </select>
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserProfile;
