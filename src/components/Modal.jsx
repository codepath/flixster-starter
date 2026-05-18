import '../styles/Modal.css'
import '../styles/Close.css'
import MovieDetails from './MovieDetails';

export default function Modal({display, closeModal, movie}){

    //Make sure modal doesn't close when content is clicked
    const handleModalContentClicked = evt => {
        evt.stopPropagation();
    }

    return (
        <div>
            <section className={display ? 'modalDisplay' : 'modalHidden'} onClick={closeModal}>
                <article className="modalContent" onClick={handleModalContentClicked}> 
                <span onClick={closeModal} className='Close' >X</span>
                <MovieDetails movie={movie}/>
                </article>
            </section>
        </div>
    );
}