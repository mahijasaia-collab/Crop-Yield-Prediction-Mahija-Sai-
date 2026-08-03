import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { loginUser, googleLogin } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role") || "farmer";

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        ...form,
        role,
      });

      setLoading(false);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login Successful");

        navigate("/dashboard");
      } else {
        alert(data.detail || "Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Server Error");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (role === "admin") {
      alert("Google Login is disabled for Admin.");
      return;
    }

    try {
      const data = await googleLogin(
        credentialResponse.credential
      );

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", "farmer");
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Google Login Successful");

        navigate("/dashboard");
      } else {
        alert(data.detail || "Google Login Failed");
      }
    } catch (err) {
      console.log(err);
      alert("Google Login Failed");
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
          "linear-gradient(135deg,#064e3b,#0f766e,#2563eb)",
      }}
    >
      <div
        style={{
          width: "460px",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(18px)",
          borderRadius: "22px",
          padding: "40px",
          boxShadow: "0 20px 45px rgba(0,0,0,.25)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div style={{ fontSize: "60px" }}>
            {role === "admin" ? "🛡️" : "🌾"}
          </div>

          <h1
            style={{
              color: "white",
              marginBottom: "10px",
            }}
          >
            {role === "admin"
              ? "Administrator Login"
              : "Farmer Login"}
          </h1>

          <p
            style={{
              color: "#dbeafe",
            }}
          >
            Sign in to YieldSense AI
          </p>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
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

        <button
          onClick={handleLogin}
          style={buttonStyle}
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        {role === "farmer" && (
          <>
            <div
              style={{
                margin: "25px 0",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              OR
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => alert("Google Login Failed")}
                theme="filled_blue"
                shape="pill"
                size="large"
                width="360"
              />
            </div>
          </>
        )}

        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "white",
          }}
        >
          Don't have an account?

          <Link
            to="/register"
            style={{
              marginLeft: "6px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </p>

        {role === "admin" && (
          <div
            style={{
              marginTop: "20px",
              background: "#fef3c7",
              color: "#92400e",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "14px",
            }}
          >
            🔒 Google Sign-In is disabled for administrator accounts.
          </div>
        )}
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
  boxSizing: "border-box",
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
  fontSize: "16px",
};