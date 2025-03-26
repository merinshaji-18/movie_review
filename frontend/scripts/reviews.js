document.getElementById("reviewForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem("user_id"); // Assuming user is logged in
    const movie_title = document.getElementById("movie-title").innerText;
    const review = document.getElementById("review-text").value;
    const rating = document.getElementById("review-rating").value;

    const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, movie_title, review, rating })
    });

    const data = await response.json();
    alert(data.message);
});
