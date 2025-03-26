const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Fetch popular movies from TMDb
router.get("/popular", async (req, res) => {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: "en-US",
                page: 1
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error: error.message });
    }
});

module.exports = router;
