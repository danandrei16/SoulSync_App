import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import TinderCards from "./TinderCards";
import SwipeButtons from "./SwipeButtons";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";
import UserProfile from "./UserProfile";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          {/* Define your routes */}
          <Routes>
            <Route path="/chat/:person" element={<ChatScreen />} />
            <Route path="/chat" element={<Chats />} />
            <Route path="/profile" element={<UserProfile />} /> {/* Route for UserProfile */}
            <Route path="/" element={<TinderCards />} />
            <Route path="/swipe-buttons" element={<SwipeButtons />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
