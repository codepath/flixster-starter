import './Filter.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

function Filter({ setFilters }) {
    const animatedComponents = makeAnimated();
    const filterOptions = [
        { value: 28, label: 'Action' },
        { value: 12, label: 'Adventure' },
        { value: 16, label: 'Animation' },
        { value: 35, label: 'Comedy' },
        { value: 80, label: 'Crime' },
        { value: 99, label: 'Documentary' },
        { value: 18, label: 'Drama' },
        { value: 10751, label: 'Family' },
        { value: 14, label: 'Fantasy' },
        { value: 36, label: 'History' },
        { value: 27, label: 'Horror' },
        { value: 10402, label: 'Music' },
        { value: 9648, label: 'Mystery' },
        { value: 10749, label: 'Romance' },
        { value: 878, label: 'Science Fiction' },
        { value: 10770, label: 'TV Movie' },
        { value: 53, label: 'Thriller' },
        { value: 10752, label: 'War' },
        { value: 37, label: 'Western' },
    ];

    const handleChange = (selectedOptions) => {
        const selectedGenres = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFilters(selectedGenres);
    };

    return (
        <div className='filterbar' key={'filter'}>
            <Select
                placeholder="Filter by …"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={filterOptions}
                onChange={handleChange}
            />
        </div>
    );
}

export default Filter;



