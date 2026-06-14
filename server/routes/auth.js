const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "general_store_secret";
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      shop_name,
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    db.query(
      `
      INSERT INTO users
      (name,email,password,shop_name)
      VALUES (?,?,?,?)
      `,
      [
        name,
        email,
        hashedPassword,
        shop_name,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "User Registered",
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const user = result[0];

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!validPassword) {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          shop_name: user.shop_name,
        },
      });

    }
  );
});

module.exports = router;