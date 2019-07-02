let searchMovie = document.getElementById('searchText');

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
                    <h4>Premier Date: ${movie.Year}</h4>
                    <h3>${movie.Title}</h3>
                </div>
                <a onclick="movieSelected('${movie.imdbID}')" href="https://www.imdb.com/title/${movie.imdbID}" target ="_blank">More info of movie on IMDb</a>
            </div>
            </div>
            `
            });
            document.querySelector('.movies').innerHTML = output;
        }
    }
    xhr.send()

}