const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const customerRoutes = require("./routes/customers");
const billRoutes = require("./routes/bills");
const paymentRoutes = require("./routes/payments");
const app = express();
const dashboardRoutes = require("./routes/dashboard");

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/bills", billRoutes);
app.use("/payments", paymentRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server Started");
});

