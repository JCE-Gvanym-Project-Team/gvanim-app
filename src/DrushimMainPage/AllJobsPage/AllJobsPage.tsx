import { Box, Button, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect, useMemo } from 'react'
import { ColorModeContext, colorTokens } from '../theme';
import JobItem from './Components/JobItem/JobItem';
import SearchBar from './Components/SearchBar/SearchBar';
import { Job } from '../../Firebase/FirebaseFunctions/Job';
import { ReactComponent as ScopeSVG } from '../AllJobsPage/Resources/Icon awesome-clock.svg';
import { ReactComponent as RoleSVG } from '../AllJobsPage/Resources/Group 71.svg';
import { ReactComponent as FilterSVG } from '../AllJobsPage/Resources/Group 1.svg';
import RoleSingleSelection from './Components/RoleSingleSelection/RoleSingleSelection';
import LocationSingleSelection from './Components/LocationSingleSelection/LocationSingleSelection';
import { Place } from '@mui/icons-material';
import NavbarDrushim from '../Components/Navbar/Navbar';
import NavBar from '../AllJobsPage/Resources/navbar2.jpg';

export default function AllJobsPage(props: { jobs: any }) {
    const { jobs } = props;


    // const [filteredJobs, setFilteredJobs] = React.useState<Job[]>([]);
    // const [submitSearch, setSubmitSearch] = React.useState<boolean>(false);

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);



    const [text, setText] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [role, setRole] = React.useState('');

    const[location, setLocation] = React.useState('');

    const [halfScope, setHalfScope] = React.useState(false);
    const [fullScope, setFullScope] = React.useState(false);


    // const filteredJobs = jobs?.filter((job: Job) => {
    //     console.log("filtering users");
    //     return (job?._region.toLowerCase().includes(search.toLowerCase()) || job?._requirements.toLowerCase().includes(search.toLowerCase()) 
    //     || job?._title.toLowerCase().includes(search.toLowerCase()));
    //   });

    const filteredJobs = useMemo(
        () =>
            jobs.filter((job: Job) => {
                console.log("filtering jobs");
                return (
                    
                    job?._region.toLowerCase().includes(search) || job?._role.toLowerCase().includes(search.toLowerCase())
                    || job?._requirements.toLowerCase().includes(search.toLowerCase())
           
                    );
            }),[search]
    );

    const filteredJobsByRole = useMemo(
        () =>
            jobs.filter((job: Job) => {
                console.log("filtering job by role");
                return job?._role.toLowerCase().includes(role);
            }),
        [role]
    );

    const filteredJobsByRegion = useMemo(
        () =>
            jobs.filter((job: Job) => {
                console.log("filtering jobs by region");
                return job?._region.toLowerCase().includes(location);
            }),
        [location]
    );



    const handleFilter = () => {

        setSearch(text);
        // console.log("SearchField: " + text);
        // console.log("LocationField: " + location);
        // if(halfScope === true){
        //     console.log('half');
        // } 
        // else { console.log('full');}
        // console.log("roleField: " + role);

    }
    return (
        <>
            {/* <Button
            color='secondary'
            onClick={() => theme.palette.mode === "light" ? colorMode.toggleColorMode("dark") : colorMode.toggleColorMode("light")}
        >
            Toggle Theme
        </Button> */}


        <img src={NavBar} alt="NavBar" style={{ width: '100%' }} />
            <Stack direction='row' sx={{padding: 6, mb: 10}}>

                <Box sx={{ width: '25%', mr: '20px'}}>

                    <Box sx={{ width: '25%', mr: '20px'}}>
                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ paddingLeft: 2}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <FilterSVG />
                            </Box>

                            <Stack direction='row' spacing={1} >
                                <Typography sx={{
                                    textAlign: 'left',
                                    fontSize: '25px',
                                    fontFamily: 'Rubik',
                                    letterSpacing: '0px',
                                    color: '#053B7A',
                                    opacity: 1,
                                }}>סינון</Typography>

                            </Stack>
                        </Stack>


                    </Box>
                    <Box sx={{ background: '#D3D3D3 0% 0% no-repeat padding-box', height: '2px', width: '92%', mt: 2, mb: 2, mr: 'auto', ml: 'auto' }} />

                    <Box sx={{ borderRadius: '10px', background: '#FAFAFA 0% 0% no-repeat padding-box', paddingBottom: 2 }}>
                        <Box sx={{ paddingLeft: 4, paddingTop: 2 }}>
                            <Typography sx={{
                                font: 'normal normal normal 18px Rubik',
                                color: '#053B7A',
                            }}>חיפוש לפי מילה חופשית:</Typography>
                            <SearchBar text={text} setText={setText} />
                        </Box>
                        <Divider sx={{ mt: 3, mb: 3 }} />

                        {/* ################# Location FILTER #################### */}
                        <Box>
                            <Stack direction='row' spacing={1.5} justifyContent='start' sx={{ mt: 4, paddingLeft: 3.5 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                                    <Place sx={{fontSize: 28, color: '#053B7A'}} />
                                </Box>

                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Typography sx={{

                                        textAlign: 'left',
                                        font: 'normal normal normal 18px Rubik',
                                        letterSpacing: '0px',
                                        color: '#053B7A',
                                        opacity: 1,
                                    }}>חיפוש לפי מיקום:</Typography>

                                </Stack>
                            </Stack>
                            <Box sx={{ mt: 2, paddingLeft: 4, paddingRight: 4  }}>
                               <LocationSingleSelection location={location} setLocation={setLocation} jobs={jobs} />
                            </Box>
                        </Box>
                        {/* ############################################## */}

                        <Divider sx={{ mt: 3, mb: 3 }} />

                        {/* ################# Scope FILTER #################### */}
                        <Box>
                            <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <ScopeSVG />
                                </Box>

                                <Stack direction='row' spacing={1} >
                                    <Typography sx={{

                                        textAlign: 'left',
                                        font: 'normal normal normal 18px Rubik',
                                        letterSpacing: '0px',
                                        color: '#053B7A',
                                        opacity: 1,
                                    }}>בחרו היקף משרה:</Typography>

                                </Stack>
                            </Stack>
                            <Stack direction='row' spacing={2} sx={{ mt: 2, paddingLeft: 4, paddingRight: 4 }}>
                                <Button onClick={() => {setFullScope(true); setHalfScope(false);}} sx={{
                                    width: '100%', font: 'normal normal normal 19px Rubik', height: '58px', background: '#EDEDED 0% 0% no-repeat padding-box', borderRadius: '4px', opacity: 1,
                                    color: '#053B7A',
                                    ':hover': {
                                        background: '#D5D5D5 0% 0% no-repeat padding-box'
                                    },
                                    ':active': {
                                        background: '#053B7A 0% 0% no-repeat padding-box',
                                        color: '#FFFFFF'
                                    },
                                    ':focus': {
                                        background: '#053B7A 0% 0% no-repeat padding-box',
                                        color: '#FFFFFF'
                                    }
                                }}>
                                    משרה מלאה
                                </Button>
                                <Button onClick={() => {setHalfScope(true); setFullScope(false);}} sx={{
                                    width: '100%', font: 'normal normal normal 19px Rubik', color: '#053B7A', height: '58px', background: '#EDEDED 0% 0% no-repeat padding-box', borderRadius: '4px', opacity: 1,
                                    ':hover': {
                                        background: '#D5D5D5 0% 0% no-repeat padding-box'
                                    },
                                    ':active': {
                                        background: '#053B7A 0% 0% no-repeat padding-box',
                                        color: '#FFFFFF'
                                    },
                                    ':focus': {
                                        background: '#053B7A 0% 0% no-repeat padding-box',
                                        color: '#FFFFFF'
                                    }
                                }}>חצי משרה</Button>
                            </Stack>
                        </Box>
                        {/* ############################################## */}

                        <Divider sx={{ mt: 3, mb: 3 }} />

                        {/* ################# Role FILTER #################### */}
                        <Box>
                            <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <RoleSVG />
                                </Box>

                                <Stack direction='row' spacing={1} alignItems='end'>
                                    <Typography sx={{
                                        textAlign: 'left',
                                        font: 'normal normal normal 18px Rubik',
                                        letterSpacing: '0px',
                                        color: '#053B7A',
                                        opacity: 1,
                                    }}>חיפוש לפי תפקיד:</Typography>

                                </Stack>
                            </Stack>
                            <Box sx={{ mt: 2, paddingLeft: 4, paddingRight: 4 }}>
                                <RoleSingleSelection jobRole={role} setJobRole={setRole} />
                            </Box>
                        </Box>
                        {/* ############################################## */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
                            <Button onClick={handleFilter} sx={{
                                width: '185px',
                                height: '40px',
                                background: '#91A749 0% 0% no-repeat padding-box',
                                color: '#FFFFFF',
                                opacity: 1,
                                borderRadius: '30px',
                                font: 'normal normal normal 18px Rubik',
                                ':hover': {
                                    background: '#D5D5D5 0% 0% no-repeat padding-box'
                                },
                            }}>
                                החל סינון
                            </Button>
                        </Box>
                    </Box>
                </Box>


                <Grid container maxWidth='1100px' spacing={2} columns={{ xs: 8, sm: 8, md: 8 }} sx={{padding: 2}}>
                <Box sx={{ background: '#D3D3D3 0% 0% no-repeat padding-box', height: '2px', width: '98.5%', mt: 2, mb: 2, ml: 'auto' }} />

                    {filteredJobs?.map((job: Job, index: any) => (

                        <Grid item xs={2} sm={4} md={4} key={index} >

                            <JobItem job={job} />

                        </Grid>
                    ))}
                </Grid>

            </Stack>



        </>
    );
}



