import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🏪 Store</h2>

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
    </div>
  );
}

export default Sidebar;