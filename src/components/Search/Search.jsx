import React from 'react'
import "../Search/Search.css"

const Search = () => {
  return (
    <div className='search-container'>
        <div className="search-content">
            <div className="serch-content-action">
                <div className="form-serch">
                    <input type="text" placeholder='Search here...' />
                </div>
                <div className="form-sortby">
                    <small>Sort by : All</small>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search