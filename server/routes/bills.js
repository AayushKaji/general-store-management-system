const express = require("express");
const router = express.Router();
const db = require("../db");
router.get("/history/:userId", (req, res) => {

  const { userId } = req.params;

  const sql = `
    SELECT
      bills.*,
      customers.name AS customer_name
    FROM bills
    JOIN customers
      ON bills.customer_id = customers.id
    WHERE bills.user_id = ?
    ORDER BY bills.id DESC
  `;

  db.query(
    sql,
    [userId],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );
});
router.post("/", (req, res) => {
  const {
    customer_id,
    total_amount,
    paid_amount,
    remaining_amount,
    items,
    user_id
  } = req.body;

  // Save Bill
  db.query(
    `INSERT INTO bills
    (customer_id,total_amount,paid_amount,remaining_amount,user_id)
    VALUES (?,?,?,?,?)`,
    [
      customer_id,
      total_amount,
      paid_amount,
      remaining_amount,
      user_id
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      const billId = result.insertId;

      // Save Bill Items
      items.forEach((item) => {

        db.query(
          `INSERT INTO bill_items
          (bill_id,product_id,quantity,price)
          VALUES (?,?,?,?)`,
          [
            billId,
            item.product_id,
            item.quantity,
            item.price,
          ]
        );

        // Reduce Stock
        db.query(
          `UPDATE products
           SET stock = stock - ?
           WHERE id = ?`,
          [
            item.quantity,
            item.product_id,
          ]
        );
      });

      // Update Customer Balance
      db.query(
        `UPDATE customers
         SET balance = balance + ?
         WHERE id = ?`,
        [
          remaining_amount,
          customer_id,
        ]
      );

      res.json({
        message: "Bill Generated",
      });
    }
  );
});

module.exports = router;