const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // ✅ For form data (important!)

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "geobhavan1$", // Change this if needed
    database: "movie_review"
});

db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err.message);
    } else {
        console.log("Connected to MySQL Database");
    }
});

app.post("/register", (req, res) => {
    console.log("Received registration data:", req.body);

    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const sql = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
    db.query(sql, [fullname, email, password], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err.sqlMessage);
            return res.status(500).json({ success: false, message: "Error registering user" });
        }
        console.log("User Registered Successfully:", result);
        res.json({ success: true, message: "Registration successful!" });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error" });
        }
        if (results.length === 0) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const user = results[0];
        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        res.json({ success: true, message: "Login successful", redirectTo: "movies.html" });
    });
});

app.post("/forgot-password", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required!" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error" });
        }
        if (results.length === 0) {
            return res.status(400).json({ success: false, message: "Email not found!" });
        }

        const tempPassword = Math.random().toString(36).slice(-8); // Generate random temp password
        const updateSql = "UPDATE users SET password = ? WHERE email = ?";
        db.query(updateSql, [tempPassword, email], (err, updateResult) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Error updating password" });
            }

            console.log("Temporary password:", tempPassword); // ✅ Log for debugging
            res.json({ success: true, message: `Your temporary password is: ${tempPassword}` });
        });
    });
});
app.post("/check-email", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required!" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error" });
        }
        if (results.length === 0) {
            return res.status(400).json({ success: false, message: "Email not found!" });
        }

        res.json({ success: true, message: "Email found! Set a new password." });
    });
});

app.post("/reset-password", (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const updateSql = "UPDATE users SET password = ? WHERE email = ?";
    db.query(updateSql, [newPassword, email], (err, updateResult) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error updating password" });
        }

        res.json({ success: true, message: "Password updated successfully! You can now log in." });
    });
});
const movieRoutes = require("./routes/movies");
app.use("/api", movieRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
