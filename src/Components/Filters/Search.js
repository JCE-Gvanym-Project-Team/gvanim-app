import React from 'react'
import './Search.css'

export default function Search({ num_of_jobs }) {
    let placeholder = "חפשו מתוך " + num_of_jobs + " משרות";
    return (
        <>
            <div id="searchBar">
                <input type="text" placeholder={placeholder} />
            </div>
        </>
    )
}
