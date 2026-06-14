import { useEffect, useState } from "react";
import axios from "axios";

function SalesHistory() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = () => {
    axios
      .get("http://localhost:5000/bills/history")
      .then((res) => {
        setBills(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Sales History</h1>

      <table className="product-table">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Due</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.customer_name}</td>
              <td>₹{bill.total_amount}</td>
              <td>₹{bill.paid_amount}</td>
              <td>₹{bill.remaining_amount}</td>
              <td>
                {new Date(
                  bill.bill_date
                ).toLocaleDateString()}
              </td>
              <td>
                <button>
                    View
                </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesHistory;