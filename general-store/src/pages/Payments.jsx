import { useEffect, useState } from "react";
import axios from "axios";

function Payments() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    const user = JSON.parse(
  localStorage.getItem("user")
);

axios.get(
  `http://localhost:5000/customers/udhaar/${user.id}`
)
      .then((res) => {
        setCustomers(res.data);
      });
  };

  const receivePayment = () => {
    if (!customerId || !amount) {
      alert("Fill all fields");
      return;
    }

    const user = JSON.parse(
  localStorage.getItem("user")
);

axios
  .post("http://localhost:5000/payments", {
    customer_id: customerId,
    amount,
    user_id: user.id,
  })
      .then(() => {
        alert("Payment Received");

        setAmount("");

        fetchCustomers();
      });
  };

  return (
    <div>
      <h1>Receive Payment</h1>

      <div className="billing-form">

        <select
          value={customerId}
          onChange={(e) =>
            setCustomerId(e.target.value)
          }
        >
          <option value="">
            Select Customer
          </option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
              {" - ₹"}
              {customer.balance}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Payment Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <button onClick={receivePayment}>
          Receive
        </button>

      </div>
    </div>
  );
}

export default Payments;