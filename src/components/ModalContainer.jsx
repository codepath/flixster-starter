import "./ModalContainer.css";
import React from "react";

function ModalContainer(props){
    return(
        <div className="modal-overlay">
            <div className="modal-content">
            <button className="close-button" onClick={props.close} >
                &times;
            </button>
            <div className="modal-body">
                <div>Title:{props.data.title}</div>
                <img src= {props.data.img}/>
                <div>Original Title: </div>
                <div> Overview: {props.data.overview}</div>
                <div>Release Date: {props.data.releaseDate}</div>
            </div>
            </div>
      </div>
    );
}

export default ModalContainer;