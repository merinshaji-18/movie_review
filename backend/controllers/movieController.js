const { addMovie, getAllMovies } = require('../models/Movie');

// ✅ ADD A NEW MOVIE
const addNewMovie = (req, res) => {
    const { title, genre, description } = req.body;

    addMovie(title, genre, description, (err, result) => {
        if (err) return res.status(500).json({ message: "Error adding movie" });
        res.status(201).json({ message: "Movie added successfully!" });
    });
};

// ✅ GET ALL MOVIES
const fetchMovies = (req, res) => {
    getAllMovies((err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching movies" });
        res.json(results);
    });
};

module.exports = { addNewMovie, fetchMovies };
