import React from 'react'
import './Search.css'
import { TextField, FormLabel } from '@mui/material';

export default function Search({ num_of_jobs }) {
    let placeholder = "חפשו מתוך " + num_of_jobs + " משרות";
    return (
        <>
            <div id="searchBar">
                <TextField
                    id="search"
                    label={placeholder}
                    variant="outlined"
                    inputProps={{ dir: 'rtl' }}
                    InputLabelProps={{
                        style: { textAlign: 'right' },
                    }}
                    fullWidth />
            </div>
        </>
    )
}
