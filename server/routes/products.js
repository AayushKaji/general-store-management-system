const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all products
router.get("/:userId", (req, res) => {

  const { userId } = req.params;

  db.query(
    `
    SELECT *
    FROM products
    WHERE user_id = ?
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

// Add product
router.post("/", (req, res) => {
  const {
    name,
    price,
    stock,
    category,
    user_id,
  } = req.body;

  db.query(
    `
    INSERT INTO products
    (name,price,stock,category,user_id)
    VALUES (?,?,?,?,?)
    `,
    [name, price, stock,category, user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Product Added"
      });
    }
  );
});

// Delete product
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM products WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Product Deleted"
      });
    }
  );
});

module.exports = router;