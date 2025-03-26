const db = require('../db');

const addMovie = (title, genre, description, callback) => {
    const sql = 'INSERT INTO movies (title, genre, description) VALUES (?, ?, ?)';
    db.query(sql, [title, genre, description], callback);
};

const getAllMovies = (callback) => {
    const sql = 'SELECT * FROM movies';
    db.query(sql, callback);
};

module.exports = { addMovie, getAllMovies };
