import { useState } from "react";
import "./Nav.css";

//Purpose: create nav bar to sort,search,filter info
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
  const [action, setAction] = useState("now_showing"); // update last used action

  const handleSortChange = (newSortString) => {
    applySort(newSortString);
  };

  const handleGenreChange = (newGenre) => {
    updateGenreFilter(newGenre);
  };

  const clearInfo = (newAction) => {
    if (newAction === action) {
      return;
    }
    setShowSearch(!showSearch);
    setData([]);
    setAction(newAction);
  };

  const resetVariables = () => {
    updateSearchText("");
    sortBy("");
    updatePage(1);
  };

  const activateNowShowing = () => {
    updateLastAction("now_showing");
    fetchData();
  };

  return (
    <nav className="nav-bar">
      <div className="button-group">
        <button
          onClick={() => {
            clearInfo("search");
          }}
        >
          Search
        </button>
        <button
          onClick={() => {
            clearInfo("now_showing");
            resetVariables();
            activateNowShowing();
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
            onChange={(e) => {
              setData([]);
              handleGenreChange(e.target.value);
            }}
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
