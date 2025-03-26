const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/user');

const SECRET_KEY = 'your_secret_key';

// ✅ REGISTER USER
const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    findUserByEmail(email, (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            createUser(name, email, hashedPassword, (err, result) => {
                if (err) return res.status(500).json({ message: "Error registering user" });
                res.status(201).json({ message: "User registered successfully!" });
            });
        });
    });
};

// ✅ LOGIN USER
const loginUser = (req, res) => {
    const { email, password } = req.body;

    findUserByEmail(email, (err, results) => {
        if (results.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ message: "Login successful", token });
        });
    });
};

module.exports = { registerUser, loginUser };
