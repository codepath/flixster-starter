import { useState, useEffect } from "react";
const Modal = (props) =>{
    const [data, setData] = useState([]);
    const [video, setVideo] = useState("");
    let id = props.query;
    let url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTI2OWIxMjIyYzJkNTliMDg0OGIwOTlkYWViN2Q5YiIsInN1YiI6IjY2Njc2NTkzNmI4ZGRiZDI3NGE5YmI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A_LcJj_8sed0Oiyee3M9o2ZgcHKGE_jdnCA4aoAx0iY'
            }
        };  
        fetch(url, options)
        .then(response => response.json())
        .then(response => {
            setData(response);
        })
        .catch(err => console.error(err));


        const info = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTI2OWIxMjIyYzJkNTliMDg0OGIwOTlkYWViN2Q5YiIsInN1YiI6IjY2Njc2NTkzNmI4ZGRiZDI3NGE5YmI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A_LcJj_8sed0Oiyee3M9o2ZgcHKGE_jdnCA4aoAx0iY'
            }
        };  
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, info)
        .then(response => response.json())
        .then(response => {
            setVideo(response.results[1].key);
            console.log(video)
        })
        .catch(err => console.error(err));
    }, [id]);



    function handleClick() {
        props.close()
    }
    function FilterArray(genres) {
        if(genres === undefined){
            return;
        }
        let arr = [];
        genres.map((genre) => arr.push(genre.name));
        return arr.join(", ");
    }
    console.log(video);

    return(
    <div id="modal">
        <div className="modal-content">
            <iframe width="560" height="315" src={video.key !== null ? `https://www.youtube.com/embed/${video}` : "https://www.youtube.com/embed/LRddjo2P0mM?si=53A5vBNZEyg05Bre"}
             title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
              gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <span className="close" onClick={handleClick}>&times;</span>
            {/* <div className="cover"> */}
                <h3 className="title">{data.original_title}</h3>
                <img className="img" src={data.poster_path !== null ? "https://image.tmdb.org/t/p/w500" + data.poster_path : "https://cringemdb.com/img/movie-poster-placeholder.png"}/>
                <h3 className="runtime">Runtime: {data.runtime} minutes</h3>
                <h3 className="overview" >Overview: {data.overview}</h3>
                <h3 className="genre">Genre: {FilterArray(data.genres)}</h3>
                <h3 className="release-date">Release Date: {data.release_date}</h3>
            {/* </div> */}
                <div className="container">
                </div>
        <div id="artistLineup"></div>
        </div>
    </div>
 )
}
export default Modal;