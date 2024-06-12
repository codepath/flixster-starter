import './Modal.css';
import React from 'react';
import MovieCard  from './MovieCard';
function Modal(props){

    return(
        <section>
            <div className="modalOverlay" >
                <div className="modalContainer" style={{background:'url(" ' + props.data.backdropImage + '")'}}>
                    <button className="closeButton" onClick={props.close}>&times;</button>
                    <div className='modalContent'>
                        <div>Title: {props.data.title}</div>
                        <img src={props.data.img} className='main-image'/>
                        <div>Original Title: {props.data.originalTitle}</div>
                        <div>Overview: {props.data.overview}</div>
                        <div>Release Date: {props.data.releaseDate}</div>
                        <div></div>


                    </div>
                </div>
            </div>
        </section>
    )
}
export default Modal;
