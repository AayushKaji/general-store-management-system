import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // Load products
  const fetchProducts = () => {
    const user = JSON.parse(
  localStorage.getItem("user")
);

axios.get(
  `http://localhost:5000/products/${user.id}`
)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = () => {
    if (!name || !category || !price || !stock) {
      alert("Fill all fields");
      return;
    }

  const user = JSON.parse(
  localStorage.getItem("user")
);
console.log(category);
    axios.post(
  "http://localhost:5000/products",
  {
    name,
    price,
    stock,
    category,
    user_id: user.id,
  }
)
      .then(() => {
        fetchProducts();

        setName("");
        setCategory("");
        setPrice("");
        setStock("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete product
  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search Product..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Grocery">Grocery</option>
          <option value="Dairy">Dairy</option>
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button onClick={addProduct}>
          Add Product
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr
              key={product.id}
              className={product.stock <= 10 ? "low-stock" : ""}
            >
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(product.id)}
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

export default Products;