import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { BoxGradientSx, MyBoxSectionSx, MyDividerSx, MyGridSx, MyPaperSx, MyTypographyInfoSx, MyTypographyMainSx, MyTypographyTitleSx } from './WelcomePageStyle'
import { ChevronLeft } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";

export default function WelcomePage(props: { setHomeActive: any, setReportsActive: any, setCandidatesActive: any, setJobsActive: any }) {
    
    const { setHomeActive, setReportsActive, setCandidatesActive, setJobsActive } = props;

    const handleReportsClick = () => {
        setReportsActive(true);
        setHomeActive(false);
        setCandidatesActive(false);
        setJobsActive(false);
        navigate("/reports");
    };

    const handleJobsClick = () => {
        setJobsActive(true);
        setReportsActive(false);
        setHomeActive(false);
        setCandidatesActive(false);
        navigate("/manageJobs");
    };

    const handleCandidatesClick = () => {
        setCandidatesActive(true);
        setJobsActive(false);
        setReportsActive(false);
        setHomeActive(false);
        navigate("/manageCandidates");
    };

    const navigate = useNavigate();
    return (
        <>
            <Box sx={BoxGradientSx} />

            <Paper sx={MyPaperSx}>

                <Grid sx={MyGridSx}>
                    <Box sx={MyBoxSectionSx}>
                        <Typography sx={MyTypographyMainSx}>
                            70
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            משרות חדשות
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                             משרות חדשות שנוספו או עודכנו, למעבר לדף ניהול המשרות:
                        </Typography>
                        
                        <Button disableRipple variant='text' endIcon={<ChevronLeft />} onClick={handleJobsClick}>לחץ כאן</Button>
                    </Box>

                    <Divider sx={MyDividerSx} />

                    <Box sx={MyBoxSectionSx}>

                        <Typography sx={MyTypographyMainSx}>
                            13
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            דוחות חדשים
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            דוחות חדשים שנוספו או עודכנו, למעבר לדף ניהול הדוחות:
                        </Typography>


                        <Button disableRipple variant='text' endIcon={<ChevronLeft />} onClick={handleReportsClick} >לחץ כאן</Button>

                    </Box>

                    <Divider sx={MyDividerSx} />


                    <Box sx={MyBoxSectionSx}>
                        <Typography sx={MyTypographyMainSx}>
                            22
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            מועמדים חדשים
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            מועמדים חדשים שנוספו או שחל שינוי בסטטוס שלהם, למעבר לדף ניהול המועמדים:
                        </Typography>
                        
                        
                        <Button disableRipple variant='text' endIcon={<ChevronLeft />} onClick={handleCandidatesClick} >לחץ כאן</Button>
                    </Box>
                </Grid>

            </Paper>

        </>
    )
}
