const express = require("express");
const router = express.Router();
const db = require("../db"); // Your MySQL database connection

// Submit a review
router.post("/review", async (req, res) => {
    const { user_id, movie_title, review } = req.body;
    
    try {
        await db.query("INSERT INTO reviews (user_id, movie_title, review) VALUES (?, ?, ?)", [user_id, movie_title, review]);
        res.json({ message: "Review submitted successfully!" });
    } catch (error) {
        console.error("Error submitting review:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get similar users based on reviews
router.get("/similar-users/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const [similarUsers] = await db.query(`
            SELECT DISTINCT u.id, u.name
            FROM users u
            JOIN reviews r ON u.id = r.user_id
            WHERE r.movie_title IN (
                SELECT movie_title FROM reviews WHERE user_id = ?
            ) AND u.id != ?
        `, [userId, userId]);

        res.json(similarUsers);
    } catch (error) {
        console.error("Error fetching similar users:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
