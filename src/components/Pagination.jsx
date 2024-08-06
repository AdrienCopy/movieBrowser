import React from 'react';


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const MAX_VISIBLE_PAGES = 4;
    const lastPage = Math.min(totalPages, 500); // Limiter à la page 500

    const generatePageNumbers = () => {
        let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
        let end = Math.min(lastPage, currentPage + Math.floor(MAX_VISIBLE_PAGES / 2));

        // Ajuster le début et la fin si elles sont trop proches des limites
        if (end - start < MAX_VISIBLE_PAGES - 1) {
            start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
        }

        return [...Array(end - start + 1).keys()].map(num => num + start);
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {currentPage > 1 && (
                <button onClick={() => onPageChange(1)}>1</button>
            )}
            {pageNumbers[0] > 2 && <span>...</span>}
            {pageNumbers.map(pageNum => (
                <button
                    key={pageNum}
                    className={pageNum === currentPage ? 'active' : ''}
                    onClick={() => onPageChange(pageNum)}
                >
                    {pageNum}
                </button>
            ))}
            {pageNumbers[pageNumbers.length - 1] < lastPage - 1 && <span>...</span>}
            {lastPage > 1 && (
                <button onClick={() => onPageChange(lastPage)}>{lastPage}</button>
            )}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
