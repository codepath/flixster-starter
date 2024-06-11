import './Search.css';

function Search() {
    const handleKeyUp = (event) => {
        const input = event.target.value.toUpperCase();
        console.log("Search Input:", input); // Check what is being typed
      
        const movieTitles = document.querySelectorAll('.title');
        console.log("Titles Found:", movieTitles.length); // Check how many titles are found
      
        movieTitles.forEach(title => {
          const isVisible = title.textContent.toUpperCase().includes(input);
          console.log("Title:", title.textContent, "Visible:", isVisible); // Check each title and its visibility status
          title.closest('.card').style.display = isVisible ? 'block' : 'none';
        });
      };

  return (
    <div className='searchbar'>
      <input
        type="text"
        placeholder="Search"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
}

export default Search;