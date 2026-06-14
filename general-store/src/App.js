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
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            <Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
            <Route path="/customers" element={
    <ProtectedRoute>
      <Customers />
    </ProtectedRoute>
  } />
            <Route path="/billing" element={
    <ProtectedRoute>
      <Billing />
    </ProtectedRoute>
  } />
            <Route path="/sales-history" element={
    <ProtectedRoute>
      <SalesHistory/>
    </ProtectedRoute>
  }/>
            <Route path="/udhaar-management" element={
    <ProtectedRoute>
      <UdhaarManagement />
    </ProtectedRoute>
  }/>
            <Route path="/payments" element={
    <ProtectedRoute>
      <Payments />
    </ProtectedRoute>
  }/>
            <Route path="/payment-history" element={
    <ProtectedRoute>
      <PaymentHistory />
    </ProtectedRoute>
  }/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;