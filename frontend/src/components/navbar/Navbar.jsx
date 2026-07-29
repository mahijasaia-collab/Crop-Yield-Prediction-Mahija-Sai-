import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import "../../styles/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span style={{ fontSize: "1.8rem" }}>🌾</span>
        <span className="logo-text">YieldSense AI</span>
      </Link>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
        
        {token ? (
          <button 
            onClick={handleLogout} 
            className="btn-nav-register" 
            style={{ background: "#ef4444" }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="btn-nav-register">
              Register
            </Link>
          </>
        )}
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </div>
    </nav>
  );
}