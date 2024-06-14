import './Sort.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

function Sort({ setSort }) {
    const animatedComponents = makeAnimated();
    const sortOptions = [
        { value: 'release_date.desc', label: 'Release Date (descending)' },
        {value: 'release_date.asc', label: 'Release Date (ascending)'},
        { value: 'vote_average.desc', label: 'Rating (descending)' },
        { value: 'vote_average.asc', label: 'Rating (ascending)' },
        { value: 'original_title.desc', label: 'Alphabetical (descending)' },
        { value: 'original_title.asc', label: 'Alphabetical (ascending)' },
    ];
    const handleChange = (selectedOption) => {
        let sort = selectedOption ? selectedOption.value : ''
        setSort(sort);
    };

    return (
        <div className='sortbar' key={'sort'}>
            <Select
                placeholder="Sort by …"
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={sortOptions}
                onChange={handleChange}
                isClearable={true}
            />
        </div>
    );
}
export default Sort;












