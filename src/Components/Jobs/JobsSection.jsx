import React from 'react'
import { Typography, Container } from '@mui/material';
import JobList from './JobList'
import jobStyles from "./JobStyle";

export default function JobsSection({ jobs, locations }) {
    const classes = jobStyles();
    const jobsByLocation = locations.map((currentLocation, index) => {
        const filteredJobs = jobs.filter((item) => {
            return item.location.includes(currentLocation);
        });
        return { location: currentLocation, jobs: filteredJobs, index: index };
    });

    // sort by jobs size
    jobsByLocation.sort((a, b) => b.jobs.length - a.jobs.length);
    console.log(jobsByLocation);
    return (
        jobsByLocation.map((obj, ind) => {
            const containerKey = `${obj.location}-${ind + 1}`;
            return (
                <React.Fragment key={obj.index}>
                    <Container key={containerKey} className={classes.sectionContainer}>
                        <Typography
                            variant="h3"
                            align="right"
                            className={classes.sectionLocation}
                        >
                            {obj.location}
                        </Typography>
                    </Container>
                    <JobList jobs={obj.jobs} key={obj.jobs.join()} />
                </React.Fragment>
            )
        })


    );
}
