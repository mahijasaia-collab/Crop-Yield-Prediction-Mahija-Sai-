import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            YieldSense AI
            <br />
            <span>Smart Crop Yield Prediction</span>
          </h1>

          <p className="hero-subtitle">
            Empowering agriculture through AI driven weather analytics, soil quality assessment, and high-precision harvest forecasting.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn-hero-primary">Get Started</Link>
            <Link to="/dashboard" className="btn-hero-outline">Explore Dashboard</Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="portal-card">
            <h4>Select Portal / Access Role</h4>
            <Link to="/login?role=farmer" className="portal-link farmer">
              🌾 Farmer Portal
            </Link>
            <Link to="/login?role=admin" className="portal-link admin">
              🛡️ Admin Dashboard
            </Link>
            <Link to="/login?role=analyst" className="portal-link researcher">
              📊 Researcher / Analyst
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}