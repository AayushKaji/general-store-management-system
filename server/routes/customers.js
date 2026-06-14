const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all customers

router.get("/udhaar", (req, res) => {
  db.query(
    `
    SELECT *
    FROM customers
    WHERE balance > 0
    ORDER BY balance DESC
    `,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM customers",
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
});



// Add customer
router.post("/", (req, res) => {
  const { name, phone, address } = req.body;

  db.query(
    "INSERT INTO customers(name, phone, address) VALUES (?, ?, ?)",
    [name, phone, address],
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