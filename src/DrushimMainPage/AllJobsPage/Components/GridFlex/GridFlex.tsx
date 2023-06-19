import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import JobItem from '../JobItem/JobItem';



export default function GridFlex() {
    return (
        <Box sx={{ flexGrow: 1, padding: 12 }}>
            <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>

                        {/* <JobItem job={undefined} /> */}

                    </Grid>
                ))}
            </Grid>


        </Box>
    );
}