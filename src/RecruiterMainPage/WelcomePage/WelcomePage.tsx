import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { BoxGradientSx, MyGridItemSx, MyDividerSx, MyGridSx, MyPaperSx, MyTypographyInfoSx, MyTypographyMainSx, MyTypographyTitleSx } from './WelcomePageStyle'
import { ChevronLeft } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import NewJobPage from '../ManageJobsPage/Components/NewJobPage/NewJobPage';
import { MyTitleBoxSx } from '../ManageJobsPage/Components/NewJobPage/NewJobStyle';

export default function WelcomePage(props: { setHomeActive: any, setReportsActive: any, setCandidatesActive: any, setJobsActive: any }) {
    const { setHomeActive, setReportsActive, setCandidatesActive, setJobsActive } = props;
    useEffect(() =>
    {
        // Code inside this effect will run after the component has rendered
        setHomeActive(true);
        setCandidatesActive(false);
        setReportsActive(false);
        setJobsActive(false);
    }, []);


    const navigate = useNavigate();
    return (
        <>
            <Box sx={BoxGradientSx} />


            <Paper sx={MyPaperSx}>

                <Grid sx={MyGridSx}>
                    <Grid item sx={MyGridItemSx}>
                        <Typography sx={MyTypographyMainSx}>
                            70
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            משרות חדשות
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            משרות חדשות שנוספו או עודכנו, למעבר לדף ניהול המשרות:
                        </Typography>

                        <Button disableRipple variant='text' endIcon={<ChevronLeft />} onClick={() => navigate("/manageJobs")}>לחץ כאן</Button>

                    </Grid>

                    <Divider orientation="vertical" flexItem />

                    <Grid item sx={MyGridItemSx}>

                        <Typography sx={MyTypographyMainSx}>
                            13
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            דוחות חדשים
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            דוחות חדשים שנוספו או עודכנו, למעבר לדף ניהול הדוחות:
                        </Typography>


                        <Button disableRipple variant='text' endIcon={<ChevronLeft />} onClick={() => navigate("/reports")} >לחץ כאן</Button>

                    </Grid>

                    <Divider orientation="vertical" flexItem />


                    <Grid item sx={MyGridItemSx}>
                        <Typography sx={MyTypographyMainSx}>
                            22
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            מועמדים חדשים
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            מועמדים חדשים שנוספו או שחל שינוי בסטטוס שלהם, למעבר לדף ניהול המועמדים:
                        </Typography>


                        <Button disableRipple variant='text' endIcon={<ChevronLeft />} onClick={() => navigate("/manageCandidates")} >לחץ כאן</Button>
                    </Grid>
                </Grid>

            </Paper>
        </>
    )
}
