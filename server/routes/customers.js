const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all customers

router.get("/udhaar/:userId", (req, res) => {

  const { userId } = req.params;

  db.query(
    `
    SELECT *
    FROM customers
    WHERE balance > 0
    AND user_id = ?
    ORDER BY balance DESC
    `,
    [userId],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );
});

router.get("/:userId", (req, res) => {

  const { userId } = req.params;

  db.query(
    `
    SELECT *
    FROM customers
    WHERE user_id = ?
    `,
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
});



// Add customer
router.post("/", (req, res) => {
  const {
  name,
  phone,
  address,
  user_id
} = req.body;

  db.query(
    `INSERT INTO customers
(name, phone, address, user_id) VALUES (?, ?, ?, ?)`,
    [name, phone, address,user_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Customer Added",
      });
    }
  );
});

// Delete customer
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM customers WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Customer Deleted",
      });
    }
  );
});

module.exports = router;