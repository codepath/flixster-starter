import React from "react";

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
            <button type="submit"  id="submit-button">Submit</button>
        </form>
    );
};

export default SearchForm;


// <form>
//                 <input className="search-bar" type="text" name="movie"  onSubmit={handleSubmit} placeholder="Search for Movies"   />
//                 {/* onChange={handleSearchChange} */}
//                 {/* value={searchQuery} */}
//                 <button type="submit" class="submit-button" >Submit</button>
//             </form>


// const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target)
//     const movieName = formData.get('movie')
//     onChange(movieName)

//     event.target.reset();
// };