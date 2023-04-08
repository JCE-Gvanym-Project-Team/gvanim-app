import React from "react";
import Job from './Job';

import { Container, Grid } from '@mui/material'
import jobStyles from "./JobStyle";


export default function JobList({ jobs }) {
    // get a list of objects where each key is a 
    // location and each value is a list of jobs in that location
    const stylesClasses = jobStyles();
    return (
        <Container className={stylesClasses.cardsContainer} >
            <Grid container spacing={4}>
                {jobs.map(job => {
                    return <Job job={job} key={job.id} />
                })}
            </Grid>
        </Container>
    );
}
