import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaRobot,
  FaCloudSunRain,
  FaSeedling,
  FaArrowRight
} from "react-icons/fa";

import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">

      <Navbar />

      {/* ---------------- HERO ---------------- */}

      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-left">

          <div className="hero-badge">

            <FaLeaf />

            AI Powered Smart Agriculture

          </div>

          <h1 className="hero-title">

            Grow Smarter with

            <span> YieldSense AI</span>

          </h1>

          <p className="hero-subtitle">

            Revolutionize farming using Artificial Intelligence,
            Weather Intelligence, Soil Health Analysis,
            Crop Recommendation and Precision Yield Prediction.

          </p>

          <div className="hero-buttons">

            <Link
              to="/register"
              className="btn-hero-primary"
            >

              Get Started

              <FaArrowRight />

            </Link>

            <Link
              to="/dashboard"
              className="btn-hero-outline"
            >

              Explore Dashboard

            </Link>

          </div>

        </div>

        <div className="hero-right">

          <div className="portal-card">

            <h3>

              🌾 Select Portal

            </h3>

            <p>

              Choose your workspace

            </p>

            <Link
              to="/login?role=farmer"
              className="portal-link farmer"
            >

              🌾 Farmer Portal

            </Link>

            <Link
              to="/login?role=admin"
              className="portal-link admin"
            >

              🛡 Admin Dashboard

            </Link>

            <Link
              to="/login?role=analyst"
              className="portal-link researcher"
            >

              📊 Research Portal

            </Link>

          </div>

        </div>

      </section>

      {/* ---------------- FEATURES ---------------- */}

      <section className="features">

        <h2>

          Why Choose YieldSense AI?

        </h2>

        <div className="feature-grid">

          <div className="feature-card">

            <FaRobot className="feature-icon"/>

            <h3>AI Prediction</h3>

            <p>

              Machine Learning based crop yield prediction.

            </p>

          </div>

          <div className="feature-card">

            <FaCloudSunRain className="feature-icon"/>

            <h3>Weather Analysis</h3>

            <p>

              Rainfall, humidity and temperature monitoring.

            </p>

          </div>

          <div className="feature-card">

            <FaSeedling className="feature-icon"/>

            <h3>Soil Health</h3>

            <p>

              Analyze nutrients and improve productivity.

            </p>

          </div>

        </div>

      </section>

    </div>
  );
}