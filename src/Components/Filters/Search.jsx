import React from 'react'
import { TextField, Container, InputAdornment } from '@mui/material';
import searchStyles from "./SearchStyle";

export default function Search({ num_of_jobs }) {
    let placeholder = "חפשו מתוך " + num_of_jobs + " משרות";
    const classes = searchStyles();
    return (
        <>
            <Container>
                <TextField
                    id="search"
                    label={placeholder}
                    variant="outlined"
                    align="right"
                    className={classes.searchBar}
                    fullWidth />
            </Container>
        </>
    )
}
