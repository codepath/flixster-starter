import "./Modal.css";

function MovieGenre({movies, genres, selectedGenre, setSelectedGenre}) {
    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
        if (genres.length > 0) {
            const filterMovies = movies.filter((movie) => movie.genre_ids.includes(genre));
            setMovies(filterMovies);
    }
    console.log("movie genres", genres);
    return (
        <div className="">
        <label>Sort by:</label>
                <select name="genre" value={selectedGenre} onChange={handleGenreChange}>
                    <option>All Genres</option>
                    {genres && genres.map((genre) => {
                        return (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                         </option>
                        )
                    })}
                </select>
        </div>
  );
}}

export default MovieGenre;
