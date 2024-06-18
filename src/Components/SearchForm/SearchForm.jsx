import React from "react";
import "../SearchForm/SearchForm.css";

const SearchForm = ({onSearchChange}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)
        const movieName = formData.get('movie')
        onSearchChange(movieName)

        event.target.reset();
    };
    return(
        <form onSubmit={handleSubmit} className="input-form-box">
            <input className="search-bar" type="text" name="movie"  placeholder="Search for Movies"></input>
            <button type="submit"  className="submit-button">Submit</button>
        </form>
    );
};

export default SearchForm;