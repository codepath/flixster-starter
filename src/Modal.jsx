import { useState, useEffect } from "react";
const Modal = (props) =>{
    const [data, setData] = useState([]);
    let genres;
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

    return(
    <div id="modal">
        <div className="modal-content">
            <span className="close" onClick={handleClick}>&times;</span>
            <div className="cover">
                <h3 className="title">{data.original_title}</h3>
                <img className="img" src={"https://image.tmdb.org/t/p/w500" + data.poster_path}/>
                <h3 className="runtime">Runtime: {data.runtime} minutes</h3>
                <h3 className="runtime">Overview: {data.overview}</h3>
                <h3 className="runtime">Genre: {FilterArray(data.genres)}</h3>
                <h3 className="runtime">Release Date: {data.release_date}</h3>
            </div>
                <div className="container">
                </div>
        <div id="artistLineup"></div>
        </div>
    </div>
 )
}
export default Modal;