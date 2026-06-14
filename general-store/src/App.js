import { BrowserRouter, Routes, Route } from "react-router-dom";
import UdhaarManagement from "./pages/UdhaarManagement";
import Sidebar from "./components/sidebar";
import SalesHistory from "./pages/SalesHistory";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import Customers from "./pages/customer";
import Billing from "./pages/billing";
import Payments from "./pages/Payments";
import PaymentHistory from "./pages/PaymentHistory";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/sales-history" element={<SalesHistory />}/>
            <Route path="/udhaar-management" element={<UdhaarManagement />}/>
            <Route path="/payments" element={<Payments />}/>
            <Route path="/payment-history" element={<PaymentHistory />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;