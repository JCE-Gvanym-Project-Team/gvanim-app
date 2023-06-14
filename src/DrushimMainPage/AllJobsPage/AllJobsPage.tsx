import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import React, { useContext, useMemo } from 'react'
import { ColorModeContext, colorTokens } from '../theme';
import GridFlex from './Components/GridFlex/GridFlex';
import JobItem from './Components/JobItem/JobItem';
import SearchBar from './Components/SearchBar/SearchBar';
import { Job } from '../../Firebase/FirebaseFunctions/Job';

export default function AllJobsPage(props: { jobs: any }) {
    const { jobs } = props;


    // const [filteredJobs, setFilteredJobs] = React.useState<Job[]>([]);
    const [submitSearch, setSubmitSearch] = React.useState<boolean>(false);

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);



    const [text, setText] = React.useState("");
    const [search, setSearch] = React.useState("");


    // const filteredJobs = jobs?.filter((job: Job) => {
    //     console.log("filtering users");
    //     return (job?._region.toLowerCase().includes(search.toLowerCase()) || job?._requirements.toLowerCase().includes(search.toLowerCase()) 
    //     || job?._title.toLowerCase().includes(search.toLowerCase()));
    //   });

    const filteredJobs = useMemo(
        () =>
            jobs.filter((job: Job) => {
                console.log("filtering jobs");
                return (job?._region.toLowerCase().includes(search.toLowerCase()) || job?._role.toLowerCase().includes(search.toLowerCase())
                    || job?._title.toLowerCase().includes(search.toLowerCase()));
            }),
        [search]
    );

    const filteredJobsByRole = useMemo(
        () =>
            jobs.filter((job: Job) => {
                console.log("filtering job by role");
                return job?._role.toLowerCase().includes(search.toLowerCase());
            }),
        [search]
    );

    const filteredJobsByRegion = useMemo(
        () =>
            jobs.filter((job: Job) => {
                console.log("filtering jobs by region");
                return job?._region.toLowerCase().includes(search.toLowerCase());
            }),
        [search]
    );

    return (
        <>            <Button
            color='secondary'
            onClick={() => theme.palette.mode === "light" ? colorMode.toggleColorMode("dark") : colorMode.toggleColorMode("light")}
        >
            Toggle Theme
        </Button>



            <Grid container maxWidth='1300px' spacing={2} columns={{ xs: 4, sm: 8, md: 8 }}>
                {filteredJobs?.map((job: Job, index: React.Key) => (

                    <Grid item xs={2} sm={4} md={4} key={index} spacing={2}>

                        <JobItem job={job} />
                        {/* {job._creationDate.} */}

                    </Grid>
                ))}
            </Grid>

     
     
        </>
    );
}



