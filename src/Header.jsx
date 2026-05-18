import SearchForm from "./components/SearchForm";
import './Header.css'

export default function Header({search,clear,searchTermFunction,searchString, sortFunc, display}) {
    return (
        <section className="Header">
            <h1>Flixster</h1>
            <SearchForm display={display} searchTerm={searchString} 
            searchFunction={search} clearFunction={clear} 
            searchTermFunc={searchTermFunction} sortFunc={sortFunc}/>
        </section>
    );
}