import './SideBar.css';

const SideBar = ({ currentPage, onPageChange }) => {
    const pages = [
        { id: 'home', label: 'Home' },
        { id: 'favorites', label: 'Favorites' },
        { id: 'watched', label: 'Watched' }
    ];

    return (
        <nav className="side-bar">
            <ul className="side-bar-nav">
                {pages.map(page => (
                    <li key={page.id} className="side-bar-item">
                        <button
                            className={`side-bar-link ${currentPage === page.id ? 'active' : ''}`}
                            onClick={() => onPageChange(page.id)}
                        >
                            {page.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SideBar
