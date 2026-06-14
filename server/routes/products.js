const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all products
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM products",
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
  const { name, category, price, stock } = req.body;

  const sql =
    "INSERT INTO products(name,category,price,stock) VALUES(?,?,?,?)";

  db.query(
    sql,
    [name, category, price, stock],
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