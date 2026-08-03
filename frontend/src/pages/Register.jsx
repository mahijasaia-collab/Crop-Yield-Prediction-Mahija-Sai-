import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

export default function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    if (
      !form.full_name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.password.length < 6) {
      alert("Password should contain minimum 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const data = await registerUser({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        role: form.role
      });

      setLoading(false);

      if (data.id) {

        alert("Registration Successful");

        navigate(`/login?role=${form.role}`);

      } else {

        alert(data.detail || "Registration Failed");

      }

    } catch (err) {

      console.log(err);

      setLoading(false);

      alert("Server Error");

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#064e3b,#0f766e,#2563eb)"
      }}
    >

      <div
        style={{
          width: "480px",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(18px)",
          borderRadius: "22px",
          padding: "40px",
          boxShadow: "0 20px 45px rgba(0,0,0,.25)"
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px"
          }}
        >

          <div style={{ fontSize: "55px" }}>
            🌾
          </div>

          <h1
            style={{
              color: "white"
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color: "#dbeafe"
            }}
          >
            Join YieldSense AI
          </p>

        </div>

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="farmer">
            🌾 Farmer
          </option>

          <option value="admin">
            🛡️ Admin
          </option>

        </select>

        <button
          onClick={handleRegister}
          style={buttonStyle}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "white"
          }}
        >
          Already have an account?

          <Link
            to={`/login?role=${form.role}`}
            style={{
              color: "#fff",
              marginLeft: "6px",
              fontWeight: "bold"
            }}
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "15px",

  marginTop: "16px",

  borderRadius: "10px",

  border: "none",

  outline: "none",

  fontSize: "15px",

  boxSizing: "border-box"

};

const buttonStyle = {

  width: "100%",

  padding: "16px",

  marginTop: "22px",

  background: "#22c55e",

  color: "white",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "16px"

};