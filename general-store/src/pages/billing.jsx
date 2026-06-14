import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Billing() {
  const [paidAmount, setPaidAmount] = useState("");
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:5000/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const addToCart = () => {
    if (!selectedProduct || !quantity) {
      alert("Select product and quantity");
      return;
    }

    const product = products.find(
      (p) => p.id === Number(selectedProduct)
    );

    const item = {
      product_id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: Number(quantity),
      subtotal:
        Number(product.price) * Number(quantity),
    };

    setCart([...cart, item]);

    setSelectedProduct("");
    setQuantity("");
  };

  const generateBill = () => {
  if (!selectedCustomer) {
    alert("Select Customer");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  axios
    .post("http://localhost:5000/bills", {
      customer_id: selectedCustomer,
      total_amount: totalAmount,
      paid_amount: Number(paidAmount) || 0,
      remaining_amount:
        remainingAmount > 0
          ? remainingAmount
          : 0,
      items: cart,
    })
    .then(() => {
      alert("Bill Generated");

downloadBill();

      setCart([]);
      setPaidAmount("");
    })
    .catch((err) => {
      console.log(err);
    });
};

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );
  const remainingAmount =
  totalAmount - (Number(paidAmount) || 0);
  const downloadBill = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("GENERAL STORE", 70, 15);

  doc.setFontSize(12);
  doc.text(`Customer ID: ${selectedCustomer}`, 10, 30);
  doc.text(`Date: ${new Date().toLocaleString()}`, 10, 40);

  let y = 60;

  doc.text("Product", 10, y);
  doc.text("Qty", 90, y);
  doc.text("Price", 120, y);
  doc.text("Total", 160, y);

  y += 10;

  cart.forEach((item) => {
    doc.text(item.name, 10, y);
    doc.text(String(item.quantity), 90, y);
    doc.text(String(item.price), 120, y);
    doc.text(String(item.subtotal), 160, y);
    y += 10;
  });

  y += 10;

  doc.text(`Total Amount: Rs ${totalAmount}`, 10, y);

  y += 10;

  doc.text(
    `Paid Amount: Rs ${Number(paidAmount) || 0}`,
    10,
    y
  );

  y += 10;

  doc.text(
    `Remaining Amount: Rs ${
      remainingAmount > 0 ? remainingAmount : 0
    }`,
    10,
    y
  );

  doc.save(`Bill-${Date.now()}.pdf`);
};

  return (
    <div>
      <h1>Billing</h1>

      <div className="billing-form">

        <select
          value={selectedCustomer}
          onChange={(e) =>
            setSelectedCustomer(e.target.value)
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
            </option>
          ))}
        </select>

        <select
          value={selectedProduct}
          onChange={(e) =>
            setSelectedProduct(e.target.value)
          }
        >
          <option value="">
            Select Product
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

        <button onClick={addToCart}>
          Add To Cart
        </button>

      </div>

      <table className="product-table">

        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>

          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.subtotal}</td>
            </tr>
          ))}

        </tbody>

      </table>

      <h2 style={{ marginTop: "20px" }}>
        Total: ₹{totalAmount}
      </h2>
      <div style={{ marginTop: "20px" }}>
  <input
    type="number"
    placeholder="Paid Amount"
    value={paidAmount}
    onChange={(e) =>
      setPaidAmount(e.target.value)
    }
  />

  <h3>
    Remaining: ₹
    {remainingAmount > 0
      ? remainingAmount
      : 0}
  </h3>

  <button
    style={{
      padding: "10px 20px",
      marginTop: "10px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    <button
  onClick={generateBill}
  style={{
    padding: "10px 20px",
    marginTop: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Generate Bill
</button>
  </button>
</div>

    </div>
  );
}

export default Billing;