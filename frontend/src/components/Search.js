import React from 'react'

function Search(props) {
    return (
        <div>
            <div className="search-area">
                <form onSubmit={props.searchBook} action="" >
                    <input type="text"
                    placeholder="Search Book"
                    onChange={props.handleSearch} />
                    <button className="btn btn-info" type="submit">Search</button>
                </form>                
            </div>
        </div>
    )
}

export default Search
