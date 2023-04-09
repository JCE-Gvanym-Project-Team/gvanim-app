import React from 'react'
import { Typography, Container } from '@mui/material';
import JobList from './JobList'
import jobStyles from "./JobStyle";
import Sort from '../Filters/Sort';

export default function JobsSection({ jobs, locations }) {

    function sortJobs(sortBy) {
        return jobs.sort((a, b) => {
            if (sortBy === 'dateOldToNew') {
                return b.datePosted.getTime() - a.datePosted.getTime();
            } else if (sortBy === 'dateNewToOld') {
                return a.datePosted.getTime() - b.datePosted.getTime();
            } else if (sortBy === 'location') {
                return a.location.localeCompare(b.location);
            } else if (sortBy === 'jobScopeLowToHigh') {
                return a.scope - b.scope;
            } else if (sortBy === 'jobScopeHighToLow') {
                return b.scope - a.scope;
            } else {
                return 0;
            }
        });
    }

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
            if (ind === 0) {
                return (
                    <React.Fragment key={obj.index}>
                        <Container key={containerKey} className={classes.sectionContainer} sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography
                                variant="h3"
                                align="right"
                                className={classes.sectionLocation}
                                sx={{ flexGrow: 1 }}
                            >
                                {obj.location}
                            </Typography>
                            <Sort onChangeFunc={sortJobs} />
                        </Container>
                        <JobList jobs={obj.jobs} key={obj.jobs.join()} />
                    </React.Fragment>
                );
            } else {
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
            }
        })
    );
}
