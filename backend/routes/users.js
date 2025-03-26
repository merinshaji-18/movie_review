const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        // Your user registration logic here
        res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error registering user" });
    }
});
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/similar-users/:userId", (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT DISTINCT u.id, u.name 
        FROM users u
        JOIN reviews r1 ON u.id = r1.user_id
        JOIN reviews r2 ON r1.movie_title = r2.movie_title
        WHERE r2.user_id = ? AND r1.user_id != ? AND r1.review = r2.review
    `;

    db.query(sql, [userId, userId], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error finding similar users" });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
