import React from "react";
import Job from './Job';

import { Container, Grid } from '@mui/material'
import jobTwoStyles from "./JobStyle";

export default function JobList({ jobs }) {
    const stylesClasses = jobTwoStyles();
    return (
        // <div id="jobListContainer">
        //     {jobs.map(job => {
        //         return <JobTwo job={job} key={job.id} />
        //     })}
        // </div>
        <Container className={stylesClasses.cardsContainer} >
            <Grid container spacing={4}>
                {jobs.map(job => {
                    return <Job job={job} key={job.id} />
                })}
            </Grid>
        </Container>
    );
}
