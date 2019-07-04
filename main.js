const searchMovie = document.getElementById('searchText');

document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let searchText = searchMovie.value;

    getMovies(searchText);
    document.getElementById('searchForm').reset();
})


function getMovies(searchText) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?apikey=f31a4db7&s=${searchText}`, true);

    xhr.onload = function () {
        if (this.status == 200) {
            let moviesData = JSON.parse(this.responseText);
            let movies = moviesData.Search;
            let output = '';
            movies.forEach((movie, index) => {
                output += `
                <div class="movie-box">
                <img src='${movie.Poster}'>
                <div class="movie-box-info">
                    <div>
                        <h3>${movie.Title}</h3>
                        <h4>Premier Date: ${movie.Year}</h4> 
                    </div>
                    <a onclick="movieSelected('${movie.imdbID}')" href="./movie.html">Learn more</a>
                </div>
                </div>
                `
            });
            document.querySelector('.movies').innerHTML = output;
        }
    }
    xhr.send()

}

function movieSelected(id) {
    sessionStorage.setItem('id', id)
}

function getMovie(id) {

    let movieId = sessionStorage.getItem('id');


    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?apikey=f31a4db7&i=${movieId}`, true);

    xhr.onload = function () {
        if (this.status == 200) {
            let movieData = JSON.parse(this.responseText);
            let movie = movieData;
            let output = '';
            output += `
                <div class="movie-box-single">
                <img src='${movie.Poster}'>
                <div class= "list">
                    <ul>
                        <li><strong>Director:</strong> <span>${movie.Director}</span></li>
                        <li><strong>IMDb Rating:</strong> <span>${movie.imdbRating}/10 (${movie.imdbVotes} votes)</span></li>
                        <li><strong>Released:</strong> <span>${movie.Released}</span></li>
                        <li><strong>Length:</strong> <span>${movie.Runtime}</span></li>
                        <li><strong>Genre:</strong> <span>${movie.Genre}</span></li>
                    </ul>
                </div>
                </div>
                <div class="btn">
                    <a href="./index.html">Go back</a>
                    <a href="https://www.imdb.com/title/${movie.imdbID}">Check IMDb for more info</a>
                </div>
                `;

            document.querySelector('.movies').innerHTML = output;
        }
    }
    xhr.send()
}