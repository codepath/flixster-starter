// import { useEffect, useState } from 'react';
// import './Modal.css';

// function Modal({ movie, onClose }) {
//   const [movieInfo, setMovieInfo] = useState(undefined);
//   const [trailerURL, setTrailerURL] = useState("");
//   const apiKey = import.meta.env.VITE_API_KEY;


// //   useEffect(() => {
// //     const options = {
// //         method: 'GET',
// //         headers: {
// //           accept: 'application/json',
// //           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2EzMjIyN2ViZDA2NDIxMmVhODU3NWI1ODI2NWEyNSIsInN1YiI6IjY2Njc2NGZkN2U0MTRkODIzM2I5Yzg1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NUYxsfy9MWnIfFGPrQ-wwi-OZ7nHi0Z8t1M0Dj62tl0'
// //         }
// //       };

// //       fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`, options)
// //         .then(response => response.json())
// //         .then(response => console.log(response.results.find(
// //             (video) => video.site === "YouTube" && video.type === "Trailer"
// //           )))
// //           .then((trailer) => setTrailerURL(`https://www.youtube.com/embed/${trailer.key}`))
// //         .catch(err => console.error(err));
// //   }, [movie.id, apiKey]);

//   useEffect(() => {
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWU5YTZiOThlMTBjZDkyZTcxN2Y4OWIzZDYxYjdjNSIsInN1YiI6IjY2NjY1MTQ1Y2M3MDc0ZDliNjFjMWM2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IDf1-04fWbMoc-zzed3BAcZLflL14UG-mdjcZobVjxA'
//       }
//     };

//     fetch(`https://api.themoviedb.org/3/movie/${movie}?language=en-US`, options)
//       .then(response => response.json())
//       .then(response => setMovieInfo(response))

//       .catch(err => console.error(err));
//   }, [movie]);

//   const handleOverlayClick = (event) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={handleOverlayClick}>
//       <div className="modal">
//         <button className="modal-close" onClick={onClose}>×</button>
//         {movieInfo && (
//           <>
//             <img src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`} alt={movieInfo.title} className="modal-image" />
//             <h1 className="modal-title">{movieInfo.title}</h1>
//             <p className="modal-rating">Rating: {movieInfo.vote_average}</p>
//             <iframe width="560" height="315" src="https://www.youtube.com/embed/lJIrF4YjHfQ?si=_JrWZvAbVhgY2un4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

//             <p className="modal-overview">{movieInfo.overview}</p>
//             <iframe width="560" height="315" src="https://www.youtube.com/embed/lJIrF4YjHfQ?si=_JrWZvAbVhgY2un4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Modal;

import { useEffect, useState } from 'react';
import './Modal.css';

function Modal({ movie, onClose }) {
  const [movieInfo, setMovieInfo] = useState(undefined);
  const [trailerURL, setTrailerURL] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;


  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWU5YTZiOThlMTBjZDkyZTcxN2Y4OWIzZDYxYjdjNSIsInN1YiI6IjY2NjY1MTQ1Y2M3MDc0ZDliNjFjMWM2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IDf1-04fWbMoc-zzed3BAcZLflL14UG-mdjcZobVjxA'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${movie}?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        setMovieInfo(response);
        console.log("response",response);

        return response.id;
      })
      .then(movieID => {
        fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}`)
          .then(response => response.json())
          .then(response => {
            const trailer = response.results.find(
              (video) => video.site === "YouTube" && video.type === "Trailer"
            );
            console.log("trailer",trailer);
            if (trailer) {
              setTrailerURL(`https://www.youtube.com/embed/${trailer.key}`);
            }
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }, [movie, apiKey]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        {movieInfo && (
          <>
            <img src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`} alt={movieInfo.title} className="modal-image" />
            <h1 className="modal-title">{movieInfo.title}</h1>
            <p className="modal-rating">Rating: {movieInfo.vote_average}</p>
            {trailerURL ? (
              <iframe width="560" height="315" src={trailerURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            ) : (
              <p>No trailer available</p>
            )}
            <p className="modal-overview">{movieInfo.overview}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
