import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #16a34a, #0891b2)",
        fontFamily: "sans-serif"
      }}
    >
      <div
        style={{
          width: "450px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(16px)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            margin: 0
          }}
        >
          Create Account
        </h1>

        <input
          placeholder="Full Name"
          style={{
            width: "100%",
            marginTop: "32px",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
        <input
          placeholder="Email"
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            boxSizing: "border-box"
          }}
        />

        <button
          style={{
            width: "100%",
            marginTop: "24px",
            padding: "16px",
            backgroundColor: "#22c55e",
            borderRadius: "12px",
            color: "#ffffff",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          Register
        </button>

        <div
          style={{
            textAlign: "center",
            color: "#ffffff",
            margin: "20px 0"
          }}
        >
          OR
        </div>

        <button
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          <FcGoogle size={28} />
          Register with Google
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#ffffff",
            marginTop: "20px",
            fontSize: "0.9rem"
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ffffff", fontWeight: "bold" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}