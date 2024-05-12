import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import TinderCards from "./TinderCards";
import SwipeButtons from "./SwipeButtons";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";

// Define a layout component that includes the Header
const Layout = ({ children }) => (
  <div className="App">
    <Header /> 
    <TinderCards />
    {children}
  </div>
);

function App() {
  // Define a message to display
  const message = "Welcome to the Tinder app!";
  
  return (
    <Router>
      <div>
        {/* Display the message */}
        <div className="message">{message}</div>
        <Routes>
          <Route element={<Layout />}>
            {/* Define your routes */}
            <Route path="/chat/:person" element={<ChatScreen />} />
            <Route path="/chat" element={<Chats />} />
            <Route path="/" element={<TinderCards />} />
            <Route path="/swipe-buttons" element={<SwipeButtons />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
