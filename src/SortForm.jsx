import { useState } from 'react';
import './SortForm.css';

const SortForm = ({ onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('default');

    const sortOptions = [
        { id: 'default', label: 'Default' },
        { id: 'title', label: 'Title (A-Z)' },
        { id: 'release_date', label: 'Release Date)' },
        { id: 'vote_average', label: 'Vote Average' }
    ];

    const handleSortClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (sortId) => {
        setSelectedSort(sortId);
        setIsOpen(false);
        onSortChange(sortId);
    };

    return (
        <div className="sort-form">
            <div className="sort-dropdown">
                <button
                    className="sort-button"
                    onClick={handleSortClick}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                >
                    Sort By: {sortOptions.find(option => option.id === selectedSort).label} &darr;
                </button>

                {isOpen && (
                    <ul className="sort-options" role="listbox">
                        {sortOptions.map(option => (
                            <li
                                key={option.id}
                                className={`sort-option ${selectedSort === option.id ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(option.id)}
                                role="option"
                                aria-selected={selectedSort === option.id}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SortForm;
