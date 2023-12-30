const populateGenreDropdown = genres => {
    const select = document.getElementById('genres');
    for (const genre of genres) {
        let option = document.createElement('option');
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
}

const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
}

const showBtn = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
}

const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

const likeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
}

const dislikeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
}

const createMoviePoster = posterPath => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');

    return posterImg;
}

