import.meta.env;

const apiKey = import.meta.env.VITE_APP_API_KEY;


const parseMovieData = (movieData) => {
    return movieData.map(data =>({
        movieId: data.id,
        movieTitle: data.original_title,
        posterImage: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        movieVoteAverage: data.vote_average
    }));
};



export {parseMovieData};