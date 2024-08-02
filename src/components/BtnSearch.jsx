import React from 'react';

const BtnSearch = ({ type = "submit", className = "search-button", glass }) => {
    return (
        <button type={type} className={className}>
            <img src={glass} />
        </button> 
    );
}

export default BtnSearch;
