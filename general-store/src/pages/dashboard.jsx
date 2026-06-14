import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
  products: 0,
  customers: 0,
  sales: 0,
  udhaar: 0,
});

useEffect(() => {
  axios
    .get("http://localhost:5000/dashboard")
    .then((res) => {
      setStats(res.data);
    });
}, []);
  return (
    <div>
      <h1 className="dashboard-title">
        General Store Dashboard
      </h1>

      <div className="card-container">

        <div className="card">
          <h3>Total Products</h3>
          <p>{stats.products}</p>
        </div>

        <div className="card">
          <h3>Total Customers</h3>
          <p>{stats.customers}</p>
        </div>

        <div className="card">
          <h3>Today's Sales</h3>
          <p>₹{stats.sales}</p>
        </div>

        <div className="card">
          <h3>Pending Udhaar</h3>
          <p>₹{stats.udhaar}</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;