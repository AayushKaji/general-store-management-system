const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {

  const data = {};

  db.query(
    "SELECT COUNT(*) AS totalProducts FROM products",
    (err, products) => {

      data.products =
        products[0].totalProducts;

      db.query(
        "SELECT COUNT(*) AS totalCustomers FROM customers",
        (err, customers) => {

          data.customers =
            customers[0].totalCustomers;

          db.query(
            "SELECT IFNULL(SUM(total_amount),0) AS totalSales FROM bills",
            (err, sales) => {

              data.sales =
                sales[0].totalSales;

              db.query(
                "SELECT IFNULL(SUM(balance),0) AS totalUdhaar FROM customers",
                (err, udhaar) => {

                  data.udhaar =
                    udhaar[0].totalUdhaar;

                  res.json(data);
                }
              );
            }
          );
        }
      );
    }
  );
});

module.exports = router;