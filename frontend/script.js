document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        "“May the Force be with you.” - Star Wars",
        "“I'm gonna make him an offer he can't refuse.” - The Godfather",
        "“Here's looking at you, kid.” - Casablanca",
        "“To infinity and beyond!” - Toy Story",
        "“Just keep swimming.” - Finding Nemo",
        "“Why so serious?” - The Dark Knight",
        "“I feel the need—the need for speed!” - Top Gun",
        "“Houston, we have a problem.” - Apollo 13"
    ];

    const quoteBox = document.querySelector(".quote-box");
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.innerText = randomQuote;
});
