import React from "react";
import "./Nav.css";

const Nav = ({
  setShowSearch,
  setData,
  updateSearchText,
  sortBy,
  updatePage,
  updateLastAction,
  fetchData,
  showSearch,
  searchText,
  performSearch,
  applySort,
  updateGenreFilter,
}) => {
  const handleSortChange = (newSortString) => {
    applySort(newSortString);
    updateGenreFilter(""); // Reset genre filter when sort is changed
  };

  const handleGenreChange = (newGenre) => {
    updateGenreFilter(newGenre);
    sortBy(""); // Reset sort when genre is changed
  };

  return (
    <nav className="nav-bar">
      <div className="button-group">
        <button
          onClick={() => {
            setShowSearch(true);
            setData([]); // Clear the movie list
          }}
        >
          Search
        </button>
        <button
          onClick={() => {
            setShowSearch(false);
            updateSearchText("");
            sortBy("");
            updatePage(1);
            updateLastAction("now_showing");
            setData([]);
            fetchData();
          }}
        >
          Now Showing
        </button>
      </div>
      {showSearch && (
        <div className="search-area">
          <input
            type="text"
            onChange={(e) => updateSearchText(e.target.value)}
            value={searchText}
          />
          <button onClick={performSearch}>Search</button>
        </div>
      )}
      {!showSearch && (
        <div className="sort-filter-group">
          <select
            name="sort"
            id="sort-menu"
            className="sort-menu"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option disabled selected value="">
              Sort by
            </option>
            <option value="popularity.desc">Popular</option>
            <option value="vote_average.desc">Top rated</option>
            <option value="title.asc">A-Z</option>
          </select>
          <select
            name="filter"
            id="filter-menu"
            className="sort-menu"
            onChange={(e) => handleGenreChange(e.target.value)}
          >
            <option value="">All Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="27">Horror</option>
            <option value="10749">Romance</option>
            <option value="9648">Mystery</option>
          </select>
        </div>
      )}
    </nav>
  );
};

export default Nav;
