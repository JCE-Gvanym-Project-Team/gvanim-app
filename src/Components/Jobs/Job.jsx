import React from 'react'
import { Typography, Card, CardActions, CardContent, ToolBar, Grid, Button } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';

import jobStyles from './JobStyle';

export default function Job({ job }) {
    const classes = jobStyles();
    return (
        <Grid item className={classes.cardContainer} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>

                    {/* Job Location */}
                    <Grid container>
                        <Grid item>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <div style={{ flexShrink: 0 }}>
                                    <LocationOnIcon className={classes.locationIcon} />
                                </div>
                                <Typography className={classes.jobLocation}>
                                    {job.location}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>

                    {/* Job Description */}
                    <a href="/#" className={classes.jobDescriptionLink}>
                        <Typography variant='h6' align="right" gutterBottom className={classes.jobDescription}>
                            {job.description}
                        </Typography>
                    </a>
                    {/* Job Scope */}
                    <Typography fontWeight={'bold'}>
                        היקף משרה:
                    </Typography>
                    <Typography align="right" color="textPrimary" gutterBottom className={classes.jobScope}>
                        {job.jobScope}
                    </Typography>
                </CardContent>

                {/* Card Button and Job ID */}
                <CardActions className={classes.buttonDiv}>
                    <Button size="large" color="primary" className={classes.viewButton}>לצפייה</Button>
                    <Typography color="textPrimary" className={classes.jobID} >
                        מס' משרה {job.id}
                    </Typography>
                </CardActions>
            </Card>
        </Grid >
    );
}
