import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registers from "./components/Register";
// import ProtectedRoute from "./components/ProtectedRoutes";
import Error from "./components/Error";
import Forgetpassword from "./components/Forgetpassword";
import Welcome from "./components/Welcome";
import Cookies from "universal-cookie";
import Verify from "./components/Verify";
import Creatnewpassword from "./components/Creatnewpassword";

// import User from "./components/User";
const cookies = new Cookies();
const App = () => { 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registers />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route path="*" element={<Error />} />
      <Route path="/check_email" element={<Verify />} />
      <Route path="/createnewpassword/:token" element={<Creatnewpassword/>} />
      <Route path="/welcome" element={<Protectedwelcome />} />
      <Route path="/welcome/:token" element={<Welcome/>} />
      {/* <Route path="/welcome/user" element={<User />} /> */}
    </Routes>
  );
};

const Protectedwelcome = () => {
  const isAuthenticated = cookies.get("TOKEN");

  return isAuthenticated ? <Welcome /> : <Navigate to="/login" />;
};

export default App;
