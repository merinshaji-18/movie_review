document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "479543f74cab9aa475642929738e02f0";
    const BASE_URL = "https://api.themoviedb.org/3";
    const TRENDING_URL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
    
    const moviesContainer = document.getElementById("movies-container");
    const searchBar = document.getElementById("search-bar");
    const searchBtn = document.getElementById("search-btn");
    
    async function fetchMovies(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayMovies(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }
    
    function displayMovies(movies) {
        moviesContainer.innerHTML = "";
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            `;

            // Redirect to details page on click
            movieCard.addEventListener("click", () => {
                window.location.href = `movie-details.html?id=${movie.id}`;
            });

            moviesContainer.appendChild(movieCard);
        });
    }
    
    searchBtn.addEventListener("click", () => {
        const query = searchBar.value.trim();
        if (query) {
            const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
            fetchMovies(SEARCH_URL);
        }
    });
    
    fetchMovies(TRENDING_URL);
});
