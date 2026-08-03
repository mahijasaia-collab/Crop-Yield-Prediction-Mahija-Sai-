import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = localStorage.getItem("role") || "farmer";

  if (role === "admin") {
    return <AdminDashboard user={user} />;
  }

  return <FarmerDashboard user={user} />;
}

/* ================= FARMER ================= */

function FarmerDashboard({ user }) {

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc"
      }}
    >
      <Navbar />

      <div
        style={{
          padding: "110px 8% 40px"
        }}
      >

        <div
          style={{
            background:
              "linear-gradient(135deg,#10b981,#2563eb)",
            color: "white",
            padding: "35px",
            borderRadius: "20px",
            marginBottom: "35px"
          }}
        >

          <h1>🌾 Farmer Dashboard</h1>

          <h2
            style={{
              marginTop: "10px"
            }}
          >
            Welcome {user.full_name}
          </h2>

          <p>
            AI Based Crop Yield Prediction Platform
          </p>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px"
          }}
        >

          <Card
            title="🌾 Crop Prediction"
            desc="Predict Yield"
            color="#16a34a"
            link="/prediction"
          />

          <Card
            title="🌦 Weather"
            desc="Today's Weather"
            color="#0284c7"
            link="/weather"
          />

          <Card
            title="🌱 Soil Analysis"
            desc="Soil Health"
            color="#ca8a04"
            link="/soil"
          />

          <Card
            title="👤 Profile"
            desc="View Profile"
            color="#7c3aed"
            link="/profile"
          />

        </div>

      </div>

    </div>
  );

}

/* ================= ADMIN ================= */

function AdminDashboard({ user }) {

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#eef2ff"
      }}
    >

      <Navbar />

      <div
        style={{
          padding: "110px 8% 40px"
        }}
      >

        <div
          style={{
            background:
              "linear-gradient(135deg,#1e3a8a,#4338ca)",
            color: "white",
            borderRadius: "22px",
            padding: "40px",
            marginBottom: "40px"
          }}
        >

          <h1>🛡️ Admin Dashboard</h1>

          <h2
            style={{
              marginTop: "10px"
            }}
          >
            Welcome {user.full_name}
          </h2>

          <p
            style={{
              marginTop: "12px"
            }}
          >
            Manage Farmers, Predictions, AI Models and System Reports
          </p>

        </div>

        {/* Stats */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px"
          }}
        >

          <StatCard
            title="Registered Farmers"
            value="--"
            color="#2563eb"
          />

          <StatCard
            title="Predictions"
            value="--"
            color="#16a34a"
          />

          <StatCard
            title="Models"
            value="1"
            color="#9333ea"
          />

          <StatCard
            title="Reports"
            value="--"
            color="#dc2626"
          />

        </div>

        <br />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px"
          }}
        >

          <Card
            title="👥 Users"
            desc="View Farmers"
            color="#2563eb"
            link="/users"
          />

          <Card
            title="➕ Add Farmer"
            desc="Create Farmer"
            color="#10b981"
            link="/add-user"
          />
          <Card
  title="👥 Users"
  value="Manage Users"
  link="/users"
  color="#2563eb"
/>
          <Card
            title="✏ Update Farmer"
            desc="Edit Details"
            color="#f59e0b"
            link="/manage-users"
          />

          <Card
            title="🗑 Delete Farmer"
            desc="Remove Farmer"
            color="#dc2626"
            link="/manage-users"
          />

          <Card
            title="🤖 Train AI"
            desc="Train Prediction Model"
            color="#7c3aed"
            link="/train-model"
          />

          <Card
            title="📊 Reports"
            desc="Analytics"
            color="#0891b2"
            link="/reports"
          />

        </div>

        <br />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "25px"
          }}
        >

          <div
            style={panelStyle}
          >

            <h2>Prediction Analytics</h2>

            <div
              style={{
                height: "250px",
                marginTop: "20px",
                background: "#f1f5f9",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#64748b",
                fontSize: "20px"
              }}
            >

              Prediction Graph

            </div>

          </div>

          <div
            style={panelStyle}
          >

            <h2>System Status</h2>

            <p>🟢 MongoDB Connected</p>

            <p>🟢 FastAPI Running</p>

            <p>🟢 JWT Active</p>

            <p>🟢 AI Ready</p>

            <p>🟢 Weather API</p>

          </div>

        </div>

      </div>

    </div>

  );

}

/* ================= COMMON CARD ================= */

function Card({ title, desc, color, link }) {

  return (

    <Link
      to={link}
      style={{
        textDecoration: "none"
      }}
    >

      <div
        style={{
          background: "white",
          borderRadius: "18px",
          padding: "25px",
          borderTop: `5px solid ${color}`,
          boxShadow: "0 10px 25px rgba(0,0,0,.08)"
        }}
      >

        <h3
          style={{
            color
          }}
        >
          {title}
        </h3>

        <p
          style={{
            marginTop: "15px",
            color: "#475569"
          }}
        >
          {desc}
        </p>

      </div>

    </Link>

  );

}

/* ================= STATS ================= */

function StatCard({ title, value, color }) {

  return (

    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "18px",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 10px 20px rgba(0,0,0,.08)"
      }}
    >

      <h3>{title}</h3>

      <h1
        style={{
          color,
          marginTop: "10px"
        }}
      >
        {value}
      </h1>

    </div>

  );

}

const panelStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,.08)"
};