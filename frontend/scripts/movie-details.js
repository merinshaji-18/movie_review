const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const API_KEY = '479543f74cab9aa475642929738e02f0'; // Replace with your TMDB API key
const DETAILS_API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

const movieDetailsContainer = document.getElementById("movie-details");

fetch(DETAILS_API_URL)
    .then(response => response.json())
    .then(movie => {
        movieDetailsContainer.innerHTML = `
            <div class="movie-details">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div>
                    <h2>${movie.title}</h2>
                    <p><strong>Release Date:</strong> ${movie.release_date}</p>
                    <p><strong>Rating:</strong> ⭐ ${movie.vote_average.toFixed(1)}</p>
                    <p><strong>Overview:</strong> ${movie.overview}</p>
                </div>
            </div>
        `;
    })
    .catch(error => console.error("Error fetching movie details:", error));
