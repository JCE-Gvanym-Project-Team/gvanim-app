import React from 'react'
import { TextField, Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import searchStyles from "./SearchStyle";

export default function Search({ num_of_jobs }) {
    let placeholder = "חפשו מתוך " + num_of_jobs + " משרות";
    const classes = searchStyles();

    const StyledTextField = withStyles({
        root: {
            "& label": {
                transformOrigin: "top right",
                right: 28,
                left: "auto"
            },
            "& legend": {
                textAlign: "right"
            }
        }
    })(TextField);

    return (
        <>
            <Container>
                <StyledTextField
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
