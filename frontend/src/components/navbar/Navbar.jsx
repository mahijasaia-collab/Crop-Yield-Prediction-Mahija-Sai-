import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import "../../styles/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scroll" : ""}`}>
      <Link to="/" className="nav-brand">
        <span className="brand-icon">🌾</span>

        <div>
          <h2 className="brand-title">YieldSense AI</h2>
          <span className="brand-subtitle">
            Smart Agriculture
          </span>
        </div>
      </Link>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>

        <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>

        <a href="#features" onClick={() => setIsOpen(false)}>
          Features
        </a>

        <a href="#about" onClick={() => setIsOpen(false)}>
          About
        </a>

        <a href="#contact" onClick={() => setIsOpen(false)}>
          Contact
        </a>

        {token && (
          <>
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>

            <Link to="/prediction" onClick={() => setIsOpen(false)}>
              Prediction
            </Link>
          </>
        )}

        {token ? (
          <>
            <span className="welcome-user">
              👋 {user?.full_name || "Farmer"}
            </span>

            <button
              onClick={handleLogout}
              className="btn-nav-register logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="btn-nav-register"
            >
              Register
            </Link>
          </>
        )}

      </div>

      <div
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </div>
    </nav>
  );
}