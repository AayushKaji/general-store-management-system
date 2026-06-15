import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const fetchCustomers = () => {
    const user = JSON.parse(
  localStorage.getItem("user")
);


axios.get(
  `http://localhost:5000/customers/${user.id}`
)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = () => {
    if (!name || !phone || !address) {
      alert("Fill all fields");
      return;
    }

    const user = JSON.parse(
  localStorage.getItem("user")
);

axios.post("http://localhost:5000/customers", {
  name,
  phone,
  address,
  user_id: user.id
})
    .then(() => {
        fetchCustomers();

        setName("");
        setPhone("");
        setAddress("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCustomer = (id) => {
    axios
      .delete(`http://localhost:5000/customers/${id}`)
      .then(() => {
        fetchCustomers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Customers</h1>

      <input
        type="text"
        placeholder="Search Customer..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="customer-form">
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button onClick={addCustomer}>
          Add Customer
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>₹{customer.balance}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;