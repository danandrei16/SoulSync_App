import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import TinderCards from "./TinderCards";
import SwipeButtons from "./SwipeButtons";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Define your routes */}
        <Routes>
          <Route path="/chat/:person" element={<ChatScreen />} />
          <Route path="/chat" element={<Chats />} />
          <Route path="/" element={<TinderCards />} />
          <Route path="/swipe-buttons" element={<SwipeButtons />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
