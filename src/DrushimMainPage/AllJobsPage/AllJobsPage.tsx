import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react'
import { ColorModeContext, colorTokens } from '../theme';
import GridFlex from './Components/GridFlex/GridFlex';
import JobItem from './Components/JobItem/JobItem';
import Job from '../Components/Job';

export default function AllJobsPage(props: { jobs: any }) {
    const { jobs } = props;

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);



    return (
        <Box sx={{background: 'radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)'}}>
            {/* <Typography variant='h1' color='background'>asdasd</Typography>
            <Button
                color='secondary'
                onClick={() => theme.palette.mode === "light" ? colorMode.toggleColorMode("dark") : colorMode.toggleColorMode("light")}
            >
                Toggle Theme
            </Button> */}

            <Box sx={{ flexGrow: 1, padding: 12 }}>
                <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {jobs?.map((job, index) => (
                      
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            
                            <JobItem job={job}/>
                            {/* {job._creationDate.} */}

                        </Grid>
                    ))}
                </Grid>


            </Box>
        </Box>
    );
}
