import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registers from "./components/Register";
// import ProtectedRoute from "./components/ProtectedRoutes";
import Cookies from "universal-cookie";
import Welcome from "./components/Welcome";

// import User from "./components/User";
const cookies = new Cookies();
const App = () => {
 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registers />} />
      <Route path="/welcome" element={<Protectedwelcome />} />
      {/* <Route path="/welcome/user" element={<User />} /> */}
    </Routes>
  );
};

const Protectedwelcome = () => {
  const isAuthenticated = cookies.get("TOKEN");

  return isAuthenticated ? <Welcome/> : <Navigate to="/login" />;
};

export default App;
