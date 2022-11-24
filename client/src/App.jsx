import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./scenes/homePage/index";
import LoginPage from "./scenes/loginPage/index";
import ProfilePage from "./scenes/profilePage/index";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile/:userID" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
