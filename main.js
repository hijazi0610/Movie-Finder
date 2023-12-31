import { populateGenreDropdown, getSelectedGenre, clearCurrentMovie, getRandomMovie, displayMovie } from "./helpers.js";

const tmdbKey = 'dd3017ce8a3f6ea82d17105d3e9025c9';
const baseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${baseUrl}${genreRequestEndpoint}${requestParams}`;
    
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres;
            return genres;
        }
    } catch(error) {
        console.log(error)
    }
};

const getMovies = async () => {
    const movieRequestEndpoint = '/discover/movie';
    const selectedGenre = getSelectedGenre();
    const requestParams = `?api_key=${tmdbKey}&with_genre=${selectedGenre}`;
    const urlToFetch = `${baseUrl}${movieRequestEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        } 
    } catch(error) {
        console.log(error)
    }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${baseUrl}${movieEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movieInfo = jsonResponse;
            return movieInfo;
        }
    } catch(error) {
        console.log(error)
    }
};

const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }
    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);

    movieInfo.removeAttribute('hidden');

}

getGenres().then(populateGenreDropdown);
playBtn.addEventListener('click', showRandomMovie);

export { showRandomMovie }

console.log(showRandomMovie())