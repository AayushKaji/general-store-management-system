import { useEffect, useState } from "react";
import axios from "axios";

function UdhaarManagement() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchUdhaar();
  }, []);

  const fetchUdhaar = () => {
    axios
      .get("http://localhost:5000/customers/udhaar")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Udhaar Management</h1>

      <table className="product-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>₹{customer.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UdhaarManagement;