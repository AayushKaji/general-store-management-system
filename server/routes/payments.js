const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/history/:userId", (req, res) => {

  const { userId } = req.params;
  const sql = `
    SELECT
  payments.*,
  customers.name AS customer_name
FROM payments
JOIN customers
ON payments.customer_id = customers.id
WHERE payments.user_id = ?
ORDER BY payments.id DESC
  `;

  db.query(
  sql,
  [userId],
  (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

router.post("/", (req, res) => {
  const {
  customer_id,
  amount,
  user_id
} = req.body;

  db.query(
    `
    INSERT INTO payments
(customer_id, amount, user_id)
VALUES (?, ?, ?)`,
    [customer_id, amount,user_id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      db.query(
        `
        UPDATE customers
        SET balance = balance - ?
        WHERE id = ?
        `,
        [amount, customer_id],
        (err2) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          res.json({
            message: "Payment Received",
          });
        }
      );
    }
  );
});

module.exports = router;