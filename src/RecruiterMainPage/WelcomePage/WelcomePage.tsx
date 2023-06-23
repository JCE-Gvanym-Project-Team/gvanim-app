import { ArrowBack, Assessment } from '@mui/icons-material';
import { Box, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyLoading from '../../Components/MyLoading/MyLoading';
import { getFilteredCandidateJobStatuses } from '../../Firebase/FirebaseFunctions/CandidateJobStatus';
import { getFilteredJobs } from '../../Firebase/FirebaseFunctions/Job';
import { BoxGradientSx, MyGridItemSx, MyGridSx, MyPaperSx, MyTypographyInfoSx, MyTypographyMainSx, MyTypographyTitleSx } from './WelcomePageStyle';


export default function WelcomePage()
{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [numJobs, setNumJobs] = useState(0);
    const [numCandidates, setNumCandidates] = useState(0);


    const fetchjobs = async () =>
    {
        let allJobs = (await getFilteredJobs());
        allJobs = allJobs.filter((job) =>
        {
            return job._open;
        });
        setNumJobs((await getFilteredJobs()).length);
    }

    const fetchCandidates = async () =>
    {
        let candidates: any[] = [];
        let candidateJobStatuses = (await getFilteredCandidateJobStatuses());
        candidateJobStatuses.forEach((candidateJobStatus) =>
        {
            if (!candidates.includes(candidateJobStatus._candidateId)){
                candidates.push(candidateJobStatus._candidateId);
            }
        })
        setNumCandidates(candidates.length);
    }

    useEffect(() =>
    {
        setLoading(false);
        fetchjobs();
        fetchCandidates();
    }, []);


    return (
        <>
            {loading ?
                (
                    <MyLoading loading={loading} setLoading={setLoading} />
                ) :
                (
                    <>
                        <Box sx={BoxGradientSx}>

                            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                                right: '2%',
                                left: 'auto',
                                top: '15%',
                                bottom: 'auto',
                                backgroundColor: 'hsla(0,0%,100%,.1)',
                                background: 'hsla(0,0%,100%,.1)',
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                position: 'absolute',
                            }} />

                            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                                right: '20%',
                                left: 'auto',
                                top: '-6%',
                                backgroundColor: 'hsla(0,0%,100%,.1)',
                                background: 'hsla(0,0%,100%,.1)',
                                width: '170px',
                                height: '170px',
                                borderRadius: '50%',
                                position: 'absolute',
                            }} />

                            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                                left: '40%',
                                top: '-1%',
                                right: 'auto',
                                bottom: 'auto',
                                backgroundColor: 'hsla(0,0%,100%,.1)',
                                background: 'hsla(0,0%,100%,.1)',
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                position: 'absolute',
                            }} />


                            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                                left: 'auto',
                                top: '16%',
                                bottom: 'auto',
                                backgroundColor: 'hsla(0,0%,100%,.1)',
                                background: 'hsla(0,0%,100%,.1)',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                position: 'absolute',
                            }} />

                            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                                left: '-2%',
                                top: '12%',
                                bottom: 'auto',
                                backgroundColor: 'hsla(0,0%,100%,.1)',
                                background: 'hsla(0,0%,100%,.1)',
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                position: 'absolute',
                            }} />

                            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                                left: '4%',
                                top: '8%',
                                bottom: 'auto',
                                backgroundColor: 'hsla(0,0%,100%,.1)',
                                background: 'hsla(0,0%,100%,.1)',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                position: 'absolute',
                            }} />

                            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                                left: '25%',
                                top: '12%',
                                bottom: 'auto',
                                backgroundColor: 'hsla(0,0%,100%,.1)',
                                background: 'hsla(0,0%,100%,.1)',
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                position: 'absolute',
                            }} />


                        </Box>

                        <Paper sx={MyPaperSx}>

                            <Grid sx={MyGridSx}>
                                <Grid item sx={MyGridItemSx}>
                                    <Typography sx={MyTypographyMainSx}>
                                        {numJobs}
                                    </Typography>

                                    <Typography sx={MyTypographyTitleSx}>
                                        משרות באתר
                                    </Typography>

                                    <Typography sx={MyTypographyInfoSx}>
                                        למעבר לדף ניהול המשרות:
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>

                                        <Link onClick={() => navigate("/management/manageJobs")}
                                            sx={{
                                                cursor: 'pointer',
                                                ":hover > #arrow": {
                                                    transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                                    transform: 'translateX(5px)',
                                                    color: '#555abf'
                                                },
                                                ":hover": { color: '#555abf' },
                                                color: '#7795f8',
                                                textDecoration: 'unset',
                                                display: 'flex', flexDirection: 'row'
                                            }}>

                                            <Typography>
                                                לחץ כאן
                                            </Typography>

                                            <ArrowBack id="arrow" sx={{
                                                color: '#7795f8',
                                                marginLeft: 1,

                                            }} />
                                        </Link>

                                    </Box>

                                </Grid>

                                <Divider orientation="vertical" flexItem />

                                <Grid item sx={MyGridItemSx}>

                                    <Typography sx={MyTypographyMainSx}>
                                        <Assessment sx={MyTypographyMainSx}/>
                                    </Typography>

                                    <Typography sx={MyTypographyTitleSx}>
                                        הפקת דוחות
                                    </Typography>

                                    <Typography sx={MyTypographyInfoSx}>
                                        למעבר לדף ניהול הדוחות:
                                    </Typography>


                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>

                                        <Link onClick={() => navigate("/management/reports")}
                                            sx={{
                                                cursor: 'pointer',
                                                ":hover > #arrow": {
                                                    transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                                    transform: 'translateX(5px)',
                                                    color: '#555abf'
                                                },
                                                ":hover": { color: '#555abf' },
                                                color: '#7795f8',
                                                textDecoration: 'unset',
                                                display: 'flex', flexDirection: 'row'
                                            }}>

                                            <Typography>
                                                לחץ כאן
                                            </Typography>

                                            <ArrowBack id="arrow" sx={{
                                                color: '#7795f8',
                                                marginLeft: 1,

                                            }} />
                                        </Link>

                                    </Box>

                                </Grid>

                                <Divider orientation="vertical" flexItem />


                                <Grid item sx={MyGridItemSx}>
                                    <Typography sx={MyTypographyMainSx}>
                                        {numCandidates}
                                    </Typography>

                                    <Typography sx={MyTypographyTitleSx}>
                                        מועמדים אקטיביים
                                    </Typography>

                                    <Typography sx={MyTypographyInfoSx}>
                                        מועמדים שבאמצע תהליך כרגע במערכת. למעבר לדף ניהול המועמדים:
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>

                                        <Link onClick={() => navigate("/management/manageCandidates")}
                                            sx={{
                                                cursor: 'pointer',
                                                ":hover > #arrow": {
                                                    transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                                    transform: 'translateX(5px)',
                                                    color: '#555abf'
                                                },
                                                ":hover": { color: '#555abf' },
                                                color: '#7795f8',
                                                textDecoration: 'unset',
                                                display: 'flex', flexDirection: 'row'
                                            }}>

                                            <Typography>
                                                לחץ כאן
                                            </Typography>

                                            <ArrowBack id="arrow" sx={{
                                                color: '#7795f8',
                                                marginLeft: 1,

                                            }} />
                                        </Link>

                                    </Box>
                                </Grid>
                            </Grid>

                        </Paper>

                        <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>
                        </Stack>
                    </>
                )}


        </>
    )
}
