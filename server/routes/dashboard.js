const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:userId", (req, res) => {

  const { userId } = req.params;

  const data = {};

  db.query(
    `
    SELECT COUNT(*) AS totalProducts
    FROM products
    WHERE user_id = ?
    `,
    [userId],
    (err, products) => {

      if (err)
        return res.status(500).json(err);

      data.products =
        products[0].totalProducts;

      db.query(
        `
        SELECT COUNT(*) AS totalCustomers
        FROM customers
        WHERE user_id = ?
        `,
        [userId],
        (err, customers) => {

          if (err)
            return res.status(500).json(err);

          data.customers =
            customers[0].totalCustomers;

          db.query(
            `
            SELECT IFNULL(
              SUM(total_amount),
              0
            ) AS totalSales
            FROM bills
            WHERE user_id = ?
            `,
            [userId],
            (err, sales) => {

              if (err)
                return res.status(500).json(err);

              data.sales =
                sales[0].totalSales;

              db.query(
                `
                SELECT IFNULL(
                  SUM(balance),
                  0
                ) AS totalUdhaar
                FROM customers
                WHERE user_id = ?
                `,
                [userId],
                (err, udhaar) => {

                  if (err)
                    return res.status(500).json(err);

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