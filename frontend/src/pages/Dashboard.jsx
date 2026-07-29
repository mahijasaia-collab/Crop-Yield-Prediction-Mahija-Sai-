import Navbar from "../components/navbar/Navbar";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px" }}>
        <h1>Dashboard</h1>
        <h3>Welcome Farmer 🌾</h3>
      </div>
    </div>
  );
}

export default Dashboard;