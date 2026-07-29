import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Prediction from "../pages/Prediction";
import Weather from "../pages/Weather";
import Soil from "../pages/Soil";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/prediction" element={<Prediction />} />

      <Route path="/weather" element={<Weather />} />

      <Route path="/soil" element={<Soil />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;