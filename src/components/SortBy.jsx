import { useState } from 'react'

function SortBy( {sortMovies} ) {

    const [sortValue, setSortValue] = useState('')

    const handleSort = (event) => {
        setSortValue(event.target.value)
        sortMovies(event.target.value);
    }


  return (
    <div>
      <select onChange={handleSort} value={sortValue}className="sortByButton" name='Sort By'>
        <option value='' selected><strong>Sort By</strong></option>
        <option value='A-Z'>Ttile (A-Z)</option>
        <option value='Date'>Newest</option>
        <option value='Rating'>Rating</option>
      </select>
    </div>
  )
};

export default SortBy;
