import '../styles/Sort.css'

export default function Sort({sort}) {

    return (
        <div className='SortBtn'>
            <select name="Sort" defaultValue="sort" onChange={sort}>
                <option value="sort" disabled hidden>Sort By</option>
                <option value="alpha">Title (A-Z)</option>
                <option value="release">Release Date (Most Recent)</option>
                <option value="vote">Vote Average (Descending)</option>
            </select>
        </div>
    );
}