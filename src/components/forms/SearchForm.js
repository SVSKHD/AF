import React from 'react';

const SearchForm = ({Keyword,setKeyword}) => {
    const handleSearchChange = (e) =>{
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }
    return (
        <div>
            <input
            autoFocus
            type="search"
            placeholder="Search"
            value={Keyword}
            className="form-control mb-4"
            onChange={handleSearchChange}
            />
        </div>
    );
}

export default SearchForm;