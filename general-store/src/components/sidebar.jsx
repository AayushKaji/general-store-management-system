import { Link } from "react-router-dom";

function Sidebar() {
 

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
};
const user = JSON.parse(
  localStorage.getItem("user")
);
  return (
    <div className="sidebar">
      <h2>General Store</h2>

<p className="shop-name">
  {user?.shop_name}
</p>

      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/customers">Customers</Link>
        </li>

        <li>
          <Link to="/billing">Billing</Link>
        </li>


          <li>
            <Link to="/sales-history">Sales History</Link>
          </li>

          <li>
            <Link to="/udhaar-management">Udhaar Management</Link>
          </li>
          <li> 
            <Link to="/payments">Payments</Link>
          </li>
          <li>
  <Link to="/payment-history">
    Payment History
  </Link>
</li>
      </ul>
      <button
  className="logout-btn"
  onClick={logout}
>
  Logout
</button>
    </div>
  );
}

export default Sidebar;