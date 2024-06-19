import.meta.env;

const apiKey = import.meta.env.VITE_APP_API_KEY;

const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

function generateYouTubeSearchURL(movieTitle) {
    const query = encodeURIComponent(`${movieTitle} trailer`);
    return `https://www.youtube.com/results?search_query=${query}`;
    // return `https://www.youtube.com/watch?v=${query}&t=102s`;
    
}

const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
};


const parseMovieData = (movieData) => {
    return movieData.map(data =>({
        movieId: data.id,
        movieTitle: data.original_title,
        posterImage: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        movieVoteAverage: data.vote_average,
        movieOverview: data.overview,
        movieBackdrop: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
        releaseDate: formatDate(data.release_date),
        trailerUrl: generateYouTubeSearchURL(data.original_title),
        genres: data.genre_ids.map(id => genreMap[id] + " ")

    }));
};



export {parseMovieData, formatDate };