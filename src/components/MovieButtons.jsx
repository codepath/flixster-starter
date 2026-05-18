import '../styles/MovieButtons.css'

export default function MovieButtons({addToFav, addToWatched, movie}) {

    const updateFav= evt => {
        evt.stopPropagation();
        movie.liked = !movie.liked
        addToFav(movie)
    }

    const updateWatch = evt => {
        evt.stopPropagation();
        movie.watched = !movie.watched
        addToWatched(movie)
    }

    return (
        <section className='buttonContainer'>
            <span className='favButton' onClick={updateFav}>{movie.liked ? '\u{1F49A}':'\u{1F90D}'}</span>
            <span className='watchButton' onClick={updateWatch}>{movie.watched ? '\u{2611}':'\u{2610}'}</span>
        </section>
    );
}