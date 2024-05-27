import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import TinderCards from "./TinderCards";
import SwipeButtons from "./SwipeButtons";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";
import UserProfile from "./UserProfile";
import ProfileSettings from "./ProfileSettings";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import { AuthProvider } from "./contexts/authContext";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          {/* Render Header only if user is logged in */}
          {user && <Header />}
          <Routes>
            <Route path="/chat/:person" element={<ChatScreen />} />
            <Route path="/chat" element={<Chats />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile_settings" element={<ProfileSettings />} /> {/* Route for UserProfile */}
            

            <Route path="/" element={
              user ? (
                <div className="homeContainer">
                    <TinderCards />
                    <SwipeButtons />
                </div>
              ) : (
                <Login />
              )
            } />
            <Route path="/register" element={<Register />} />
            {/* Add a route for /login */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
