import Sort from "./Sort";
import '../styles/SearchForm.css'

export default function SearchForm({display, searchFunction, clearFunction, searchTerm, searchTermFunc, sortFunc}) {

    const handleEnter = evt => {
        if(evt.key === 'Enter'){
            searchFunction();
        }
    }

    return (
        <article className={display ? "SearchForm" : "hideSearchForm"}>
            <input value={searchTerm} type="text" placeholder="Search..." name="movieSearch" className="SearchBar" onChange={searchTermFunc} onKeyDown={handleEnter}/>
            <button className="searchBtn" onClick={searchFunction}>Submit</button>
            <button className="searchBtn" onClick={clearFunction}>Clear</button>
            <Sort sort={sortFunc}/>
        </article>
    );
}