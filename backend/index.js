import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "GaliPet API running" });
  });
  
// register
app.post("/register", async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    email = email.toLowerCase(); 

    // check if user exists
    const userExist = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, hashedPassword, role]
    );

    res.json({ message: "User created", user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//login
app.post("/login", async (req, res) => {
    try {
      let { email, password } = req.body;
      console.log("EMAIL RECEIVED:", req.body.email);

      email = email.toLowerCase();
      console.log("EMAIL USED:", email);
      
      const user = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
  
      if (user.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
  
      if (!validPassword) {
        return res.status(401).json({ message: "Wrong password" });
      }
  
      // create JWT
      const token = jwt.sign(
        { id: user.rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.json({
        token,
        user: {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
          role: user.rows[0].role,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
// middleware
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
    if (!authHeader) return res.sendStatus(401);
  
    const token = authHeader.split(" ")[1];
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
  
  app.get("/profile", authMiddleware, async (req, res) => {
    const user = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.user.id]
    );
  
    res.json(user.rows[0]);
  });
  
// server listening
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});